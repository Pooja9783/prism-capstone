
const { resolveModel } = require('./modelResolver')
const { chatCompletion } = require('../providers/openRouterProvider')
const { saveRequestLog } = require("../services/requestLogService")
const providerModelMap = require('../constants/providerModelMap')
const { getCurrentMonthCost } = require('./budgetService')
const { checkRateLimit } = require('../services/rateLimitService')


async function chat(req) {
    const startTime = Date.now()

    const { model, messages } = req.body

    const routing = resolveModel(model)
    const providerModel = providerModelMap[routing.primary]
    const fallbackModel = providerModelMap[routing.fallbacks[0]]

    const requestCount = await checkRateLimit(req.tenant)

    if (requestCount >= req.tenant.rate_limit.requests_per_minute) {
        const error = new Error("Rate Limit exceed")
        error.status = 429
        throw error
    }

    const currentMonthCost = await getCurrentMonthCost(req.tenant.team)
    const monthlyBudget = req.tenant.monthly_budget_usd

    if (currentMonthCost >= monthlyBudget) {
        const error = new Error("Monthly budget exceed")
        error.status = 403
        throw error
    }

    let response
    let fallback = false

    try {
        response = await chatCompletion(messages, providerModel)
    } catch (error) {
        console.log("Primary provider failed. Trying fallback")

        try {
            response = await chatCompletion(messages, fallbackModel)

            fallback = true
        } catch {
            throw new Error("Both primary and fallback provider failed")
        }
    }

    const latency = Date.now() - startTime

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
    }
    await saveRequestLog(log)
    return response;
}

module.exports = {
    chat
}