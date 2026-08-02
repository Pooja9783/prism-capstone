const { RequestLogModel } = require("../models/requestLog");

async function getRequests(limit = 10) {
    const requests = await RequestLogModel.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    return requests.map((request) => ({
        id: request._id,
        team: request.team,
        provider: request.provider.name,
        model: request.provider.model,
        promptTokens: request.usage.promptTokens,
        completionTokens: request.usage.completionTokens,
        totalTokens: request.usage.totalTokens,
        cost: Number(request.cost.toFixed(8)),
        status: request.status,
        cacheHit: request.cacheHit,
        fallback: request.fallback,
        latency: request.latency,
        createdAt: request.createdAt,
    }));
}

module.exports = {
    getRequests,
};