const { RequestLogModel } = require("../models/requestLog")



async function getMetrics() {
    const metrics = await RequestLogModel.aggregate([
        {
            $group: {
                _id: null,
                totalRequests: { $sum: 1 },
                totalCost: { $sum: "$cost" },
                averageLatency: { $avg: "$latency" },
                fallbackCount: {
                    $sum: {
                        $cond: ['$fallback', 1, 0]
                    }
                },
                cacheHits: {
                    $sum: {
                        $cond: ['$cacheHit', 1, 0]
                    }
                }
            }
        }
    ])

    return metrics[0] || {}
}

module.exports = {
    getMetrics
}