const { getMetrics } = require('../services/metricsService')

async function metrics(req, res) {
    const data = await getMetrics()

    return res.status(200).json(data)

}

module.exports = {
    metrics
}