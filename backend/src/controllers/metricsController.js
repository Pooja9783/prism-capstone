const { getMetrics, getUsageMetrics, getUsageDetails, getProviderDistribution, getTopModelsUsage } = require('../services/metricsService')

async function metrics(req, res) {
    const data = await getMetrics()

    return res.status(200).json(data)

}

async function usageMetrics(req, res) {
    const data = await getUsageMetrics()

    return res.status(200).json(data)
}

async function usageDetails(req, res, next) {
    try {
        const data = await getUsageDetails();
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

async function providerDistribution(req, res, next) {
    try {
        const data = await getProviderDistribution();
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

async function topModelsUsage(req, res, next) {
    try {
        const data = await getTopModelsUsage();
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    metrics,
    usageMetrics,
    usageDetails,
    providerDistribution,
    topModelsUsage
}