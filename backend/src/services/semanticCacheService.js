
const { semanticCacheModel } = require("../models/semanticCache")
const { cosineSimilarity } = require("../utils/cosineSimilarity")

async function findSimilarPrompt(team, embedding) {
    const cacheEntries = await semanticCacheModel.find({ team })

    let bestMatch = null;
    let highSimilarity = 0;


}

module.exports = {
    findSimilarPrompt
}