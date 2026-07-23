const { resolveModel } = require("./modelResolver");
const { chatCompletion } = require("../providers/openRouterProvider");
const { saveRequestLog } = require("../services/requestLogService");
const providerModelMap = require("../constants/providerModelMap");
const { getCurrentMonthCost } = require("./budgetService");
const { checkRateLimit } = require("../services/rateLimitService");
const { generateEmbedding } = require("../providers/embeddingProvider");
const { findSimilarPrompt, saveCache } = require("./semanticCacheService");
const { retry } = require('./retryService')
const { getConfig } = require('./configLoader')

async function chat(req) {

    console.log("Inside chat service");
    const config = getConfig()
    const startTime = Date.now();

    const retryConfig = config.gatewayConfig.retry


    const { model, messages, stream = false } = req.body;

    const prompt = messages.map(message => message.content).join(" ");

    const routing = resolveModel(model);
    const providerModel = providerModelMap[routing.primary];
    const fallbackModel = providerModelMap[routing.fallbacks[0]];

    // Rate limit
    const requestCount = await checkRateLimit(req.tenant);

    if (requestCount >= req.tenant.rate_limit.requests_per_minute) {
        const error = new Error("Rate Limit exceeded");
        error.status = 429;
        throw error;
    }

    // Budget check
    const currentMonthCost = await getCurrentMonthCost(req.tenant.team);
    const monthlyBudget = req.tenant.monthly_budget_usd;

    if (currentMonthCost >= monthlyBudget) {
        const error = new Error("Monthly budget exceeded");
        error.status = 403;
        throw error;
    }

    let embedding;

    if (!stream) {
        // Generate embedding
        embedding = await generateEmbedding(prompt);
        // Semantic cache
        const cachedResponse = await findSimilarPrompt(
            req.tenant.team,
            embedding
        );

        // Cache hit
        if (cachedResponse) {
            const latency = Date.now() - startTime;

            const log = {
                team: req.tenant.team,
                providerModel: "cache",
                provider: {
                    name: "cache",
                    model: "cache"
                },
                status: "success",
                usage: {
                    promptTokens: 0,
                    completionTokens: 0,
                    totalTokens: 0
                },
                cost: 0,
                cacheHit: true,
                fallback: false,
                latency
            };

            await saveRequestLog(log);

            return {
                response: cachedResponse.response,
                metadata: {
                    provider: "cache",
                    cache: true,
                    fallback: false,
                    cost: 0
                }
            }
        }

    }



    // stream
    if (stream) {
        let streamResponse
        let fallback = false;

        try {

            console.log("Provider Model:", providerModel);
            streamResponse = await retry(
                () => chatCompletion(messages, providerModel, true),
                retryConfig.max_attempts,
                retryConfig.initial_backoff_ms,
                retryConfig.backoff_multiplier)
        } catch (error) {
            console.log("Primary provider failed after retries. Trying fallback...");


            try {
                streamResponse = await retry(
                    () => chatCompletion(messages, fallbackModel, true),
                    retryConfig.max_attempts,
                    retryConfig.initial_backoff_ms,
                    retryConfig.backoff_multiplier
                );

                fallback = true;
            } catch (error) {
                throw new Error("Both primary and fallback provider failed");
            }

        }

        return {
            stream: true,
            response: streamResponse,
            metadata: {
                provider: fallback ? fallbackModel : providerModel,
                cache: false,
                fallback,
                cost: 0
            }
        }
    }


    // Call provider
    let response;
    let fallback = false;

    console.log("Provider Model:", providerModel);

    try {
        response = await retry(
            () => chatCompletion(messages, providerModel),
            retryConfig.max_attempts,
            retryConfig.initial_backoff_ms,
            retryConfig.backoff_multiplier
        )
    } catch (error) {
        console.log("Primary provider failed. Trying fallback...");

        try {
            response = await retry(
                () => chatCompletion(messages, fallbackModel),
                retryConfig.max_attempts,
                retryConfig.initial_backoff_ms,
                retryConfig.backoff_multiplier
            )
            fallback = true;
        } catch (error) {
            throw new Error("Both primary and fallback provider failed");
        }
    }

    const latency = Date.now() - startTime;

    // Normal request log
    const log = {
        team: req.tenant.team,
        providerModel: response.model,
        provider: {
            name: response.provider,
            model: response.model
        },
        status: "success",
        usage: {
            promptTokens: response.usage.prompt_tokens,
            completionTokens: response.usage.completion_tokens,
            totalTokens: response.usage.total_tokens
        },
        cost: response.usage.cost,
        cacheHit: false,
        fallback,
        latency
    };

    await saveRequestLog(log);

    // Save response to semantic cache
    await saveCache(
        req.tenant.team,
        prompt,
        embedding,
        response
    );

    return {
        stream: true,
        response,
        metadata: {
            provider: response.provider,
            cache: false,
            fallback,
            cost: response.usage.cost
        }

    };
}

module.exports = {
    chat
};