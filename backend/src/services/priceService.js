const { getConfig } = require('./configLoader')


function calculateCost(model, usage) {
    const config = getConfig()

    const pricing = config.modelPricing[model];

    if (!pricing) {
        throw new Error(`Pricing not found for model: ${model}`)
    }

    const inputCost = (usage.prompt_tokens / 1_000_000) * pricing.input_per_1m
    const outputCost = (usage.completion_tokens / 1_000_000) * pricing.output_per_1m

    return inputCost + outputCost
}


module.exports = {
    calculateCost
}