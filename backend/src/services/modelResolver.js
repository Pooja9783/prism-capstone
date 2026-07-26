const { getConfig, loadConfig } = require('./configLoader')
const { classifyPrompt } = require('./routingService')

function resolveModel(model, prompt) {
    loadConfig()
    const config = getConfig()

    if (model === 'auto') {
        const tier = classifyPrompt(prompt)
        return config.gatewayConfig.model_aliases[tier]
    }

    return config.gatewayConfig.model_aliases[model]
}


module.exports = {
    resolveModel
}