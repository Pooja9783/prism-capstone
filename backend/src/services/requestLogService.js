const { RequestLogModel } = require('../models/requestLog')


async function saveRequestLog(log) {

    const savedLog = await RequestLogModel.create(log)

    return savedLog
}

module.exports = {
    saveRequestLog
}