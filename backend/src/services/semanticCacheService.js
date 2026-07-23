
const { semanticCacheModel } = require("../models/semanticCache")
const { cosineSimilarity } = require("../utils/cosineSimilarity")

async function findSimilarPrompt(team, embedding) {
    const cacheEntries = await semanticCacheModel.find({ team })

    let bestMatch = null;
    let highSimilarity = 0;

    for (let entry of cacheEntries) {
        const similarity = cosineSimilarity(embedding, entry.embedding)

        if (similarity > highSimilarity) {
            highSimilarity = similarity
            bestMatch = entry
        }
    }

    if (highSimilarity >= 0.92) {
        return bestMatch
    }

    return null


}

async function saveCache(team, prompt, embedding, response) {
    return await semanticCacheModel.create({
        team, prompt, embedding, response
    })
}

module.exports = {
    findSimilarPrompt,
    saveCache

}