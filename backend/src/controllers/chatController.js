const { chat } = require("../services/chatService");

const chatCompletions = async (req, res, next) => {
  try {
    const result = await chat(req, res);

    // If it's a streaming response, chat() already handled it.
    if (res.headersSent) {
      return;
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = chatCompletions;