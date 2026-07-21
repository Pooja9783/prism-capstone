const express = require('express')

const validateRequest = require("../middlewares/validateRequest")
const chatCompletions = require("../controllers/chatController")
const { authenticateApiKey } = require("../middlewares/authenticateApiKey")

const router = express.Router()

router.post('/chat/completions', validateRequest, authenticateApiKey, chatCompletions)

module.exports = router