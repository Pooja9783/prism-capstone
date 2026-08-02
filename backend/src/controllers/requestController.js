const { getRequests } = require("../services/requestServices");

async function requests(req, res, next) {
  try {
    const requestedLimit = Number(req.query.limit);
    const limit =
      Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 10;

    const data = await getRequests(limit);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requests,
};