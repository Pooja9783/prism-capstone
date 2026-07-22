
const { RequestLogModel } = require('../models/requestLog')


async function checkRateLimit(tenant) {

    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const requestCount = await RequestLogModel.countDocuments({
        team: tenant.team,
        createdAt: { $gte: oneMinuteAgo }
    })

    return requestCount

}

module.exports = {
    checkRateLimit
}