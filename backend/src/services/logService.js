const { saveRequestLog } = require("./requestLogService");

async function logRequest({
    team,
    provider,
    model,
    usage,
    cacheHit,
    fallback,
    latency
}) {

    const log = {
        team,
        providerModel: model,
        provider: {
            name: provider,
            model
        },
        status: "success",
        usage: {
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens
        },
        cost: usage.cost,
        cacheHit,
        fallback,
        latency
    };

    await saveRequestLog(log);
}

module.exports = {
    logRequest
};