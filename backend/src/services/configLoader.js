// Load configuration files and make them available to the application.

const fs = require('fs')
const path = require('path')

const config = {}

function readJsonFile(fileName) {
    const filePath = path.join(__dirname, "../data/", fileName)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    return JSON.parse(fileContent)
}


function readJsonlFile(fileName) {
    const filePath = path.join(__dirname, "../data/", fileName)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = fileContent.split('\n').filter((line) => line.trim()).map((element) => JSON.parse(element))

    return data

}


function loadConfig() {
    config.gatewayConfig = readJsonFile("gateway_config.sample.json")
    config.modelPricing = readJsonFile("model_pricing.json")
    config.routingEval = readJsonlFile("routing_eval.jsonl")
    config.sampleRequests = readJsonlFile("sample_requests.jsonl")
    config.seedKeys = readJsonFile("seed_keys.json")
}

function getConfig() {
    return config
}


module.exports = {
    getConfig,
    loadConfig
}