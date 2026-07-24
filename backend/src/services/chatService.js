const { resolveModel } = require("./modelResolver");
const { chatCompletion } = require("../providers/openRouterProvider");
const providerModelMap = require("../constants/providerModelMap");
const { getCurrentMonthCost } = require("./budgetService");
const { checkRateLimit } = require("../services/rateLimitService");
const { generateEmbedding } = require("../providers/embeddingProvider");
const { findSimilarPrompt, saveCache } = require("./semanticCacheService");
const { retry } = require('./retryService')
const { getConfig } = require('./configLoader')
const { logRequest } = require('./logService')
const { calculateCost } = require('./priceService')

async function chat(req, res) {

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

            await logRequest({
                team: req.tenant.team,
                provider: "cache",
                model: "cache",
                usage: {
                    prompt_tokens: 0,
                    completion_tokens: 0,
                    total_tokens: 0,
                    cost: 0
                },
                fallback: false,
                cacheHit: true,
                latency
            });

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

        // Stream response (works for both primary and fallback)

        const reader = streamResponse.body.getReader();
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.setHeader("x-prism-provider", fallback ? fallbackModel : providerModel);
        res.setHeader("x-prism-cache", "false");
        res.setHeader("x-prism-fallback", fallback);

        res.flushHeaders();

        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            res.write(chunk);
        }

        const events = fullResponse
            .split("\n\n")
            .filter(event => event.startsWith("data: "));

        const parsedEvents = events
            .filter(event => event !== "data: [DONE]")
            .map(event => JSON.parse(event.replace("data: ", "")));

        const finalEvent = parsedEvents.find(event => event.usage);

        if (!finalEvent) {
            throw new Error("Usage event not found in stream response");
        }


        const usage = finalEvent.usage;
        const latency = Date.now() - startTime;

        console.log("Stream log saved");

        const calculatedCost = calculateCost(
            fallback ? fallbackModel : providerModel,
            usage
        );

        await logRequest({
            team: req.tenant.team,
            provider: finalEvent.provider,
            model: finalEvent.model,
            usage: {
                ...usage,
                cost: calculatedCost
            },
            fallback,
            cacheHit: false,
            latency
        });

        res.end();
        return;
    }

    // Call provider
    let response;
    let fallback = false;
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

    const pricingModel = fallback ? fallbackModel : providerModel;

    const calculatedCost = calculateCost(
        pricingModel,
        response.usage
    );

    await logRequest({
        team: req.tenant.team,
        provider: response.provider,
        model: response.model,
        usage: {
            ...response.usage,
            cost: calculatedCost
        },
        fallback,
        cacheHit: false,
        latency
    });

    const cachedResponse = {
        ...response,
        usage: {
            ...response.usage,
            cost: calculatedCost
        }
    };

    // Save response to semantic cache
    await saveCache(
        req.tenant.team,
        prompt,
        embedding,
        cachedResponse
    );

    return {
        stream: false,
        response,
        metadata: {
            provider: response.provider,
            cache: false,
            fallback,
            cost: calculatedCost
        }

    };
}

module.exports = {
    chat
};