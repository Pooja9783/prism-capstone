
const chatService = require('../services/chatService')

const chatCompletions = async (req, res) => {
    const response = await chatService.chat(req)
    return res.status(200).json(response)
}


module.exports = chatCompletions 