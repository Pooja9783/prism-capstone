

function cosineSimilarity(vector1, vector2) {

    const dotProduct = vector1.reduce((sum, value, index) => {
        return sum + value * vector2[index]
    }, 0)

    const magnitude1 = Math.sqrt(vector1.reduce((sum, value) => {
        return sum + value * value
    }, 0))

    const magnitude2 = Math.sqrt(vector2.reduce((sum, value) => {
        return sum + value * value
    }, 0))

    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0
    }

    return dotProduct / (magnitude1 * magnitude2)

}


module.exports = {
    cosineSimilarity
}