
const { resolveModel } = require('./modelResolver')
const { chatCompletion } = require('../providers/openRouterProvider')
const providerModelMap = require('../constants/providerModelMap')
const { saveRequestLog } = require("../services/requestLogService")


async function chat(req) {
    const startTime = Date.now()

    const { model, messages } = req.body

    const routing = resolveModel(model)
    const providerModel = providerModelMap[routing.primary]
    const response = await chatCompletion(messages, providerModel)
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

        fallback: false,

        latency: 0
    }
    await saveRequestLog(log)
    return response;
}

module.exports = {
    chat
}