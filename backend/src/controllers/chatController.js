
const { chat } = require('../services/chatService')

const chatCompletions = async (req, res) => {
    await chat(req, res)
}

module.exports = chatCompletions 