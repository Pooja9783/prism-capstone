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


async function getUsageMetrics() {
  const usage = await RequestLogModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        },
        requests: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        requests: 1
      }
    }
  ]);

  return usage;
}

async function getUsageDetails() {
  return RequestLogModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },

        cost: {
          $sum: "$cost",
        },

        tokens: {
          $sum: "$usage.totalTokens",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        cost: {
          $round: ["$cost", 8],
        },
        tokens: 1,
      },
    },
  ]);
}

async function getProviderDistribution() {
  return RequestLogModel.aggregate([
    {
      $group: {
        _id: "$provider.name",
        value: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1,
      },
    },
  ]);
}

async function getTopModelsUsage() {
  return RequestLogModel.aggregate([
    {
      $group: {
        _id: "$provider.model",
        requests: {
          $sum: 1,
        },
        tokens: {
          $sum: "$usage.totalTokens",
        },
        cost: {
          $sum: "$cost",
        },
      },
    },
    {
      $sort: {
        requests: -1,
      },
    },
    {
      $project: {
        _id: 0,
        model: "$_id",
        requests: 1,
        tokens: 1,
        cost: {
          $round: ["$cost", 8],
        },
      },
    },
  ]);
}



module.exports = {
  getMetrics,
  getUsageMetrics,
  getUsageDetails,
  getProviderDistribution,
  getTopModelsUsage
};