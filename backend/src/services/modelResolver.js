const { getConfig, loadConfig } = require('../services/configLoader')

function resolveModel(model) {
    loadConfig()
    const config = getConfig()

    return config.gatewayConfig.model_aliases[model]
}


module.exports = {
    resolveModel
}