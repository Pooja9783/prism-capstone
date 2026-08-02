const { getSettings } = require("../services/settingsService");

function settings(req, res, next) {
  try {
    const data = getSettings();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  settings,
};