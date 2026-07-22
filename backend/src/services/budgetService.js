const { RequestLogModel } = require("../models/requestLog")


async function getCurrentMonthCost(team) {
    const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    )

    const logs = await RequestLogModel.find({
        team, createdAt: { $gte: startOfMonth }
    })

    const totalCost = logs.reduce((sum, log) => {
        return sum + log.cost
    }, 0)

    return totalCost

}

module.exports = {
    getCurrentMonthCost
}