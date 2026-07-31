const { RequestLogModel } = require("../models/requestLog");

async function getMetrics() {
  const metrics = await RequestLogModel.aggregate([
    {
      $group: {
        _id: null,
        totalRequests: { $sum: 1 },
        totalCost: { $sum: "$cost" },
        totalTokens: { $sum: "$usage.totalTokens" },
        averageLatency: { $avg: "$latency" },
        fallbackCount: {
          $sum: {
            $cond: ["$fallback", 1, 0]
          }
        },
        cacheHits: {
          $sum: {
            $cond: ["$cacheHit", 1, 0]
          }
        }
      }
    }
  ]);

  const data = metrics[0];

  if (!data) {
    return {
      totalRequests: 0,
      totalCost: 0,
      totalTokens: 0,
      averageLatency: 0,
      fallbackCount: 0,
      cacheHits: 0
    };
  }

  return {
    totalRequests: data.totalRequests,
    totalCost: Number(data.totalCost.toFixed(8)),
    totalTokens: data.totalTokens,
    averageLatency: Math.round(data.averageLatency),
    fallbackCount: data.fallbackCount,
    cacheHits: data.cacheHits
  };
}

module.exports = {
  getMetrics
};