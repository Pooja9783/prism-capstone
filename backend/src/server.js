const express = require('express')
const cors = require("cors");
require('dotenv').config()

const { connectDB } = require("../src/config/database")
const { loadConfig } = require("../src/services/configLoader")
const chatRoutes = require('./routes/chatRoute')
const metricsRoutes = require("./routes/metricsRouter");
const requestRoutes = require("./routes/requestRoute");
const usageDetails = require("./routes/requestRoute");
const providerDistribution = require("./routes/requestRoute");
const settingsRoutes = require("./routes/settingsRoute");

connectDB()
loadConfig()

const app = express()

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://prism-capstone-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


app.use(express.json())

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.originalUrl);
    next();
});

app.use("/v1", chatRoutes)
app.use("/v1", metricsRoutes)
app.use("/v1", requestRoutes);
app.use("/v1", usageDetails);
app.use("/v1", providerDistribution);
app.use("/v1", settingsRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})