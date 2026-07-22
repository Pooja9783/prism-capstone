const express = require('express')
require('dotenv').config()

const { connectDB } = require("../src/config/database")
const { loadConfig } = require("../src/services/configLoader")
const chatRoutes = require('./routes/chatRoute')
const { metrics } = require('./controllers/metricsController')

connectDB()
loadConfig()

const app = express()
app.use(express.json())

app.use("/v1", chatRoutes)
app.use("/v1", metrics)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})