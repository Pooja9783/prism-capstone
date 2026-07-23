

async function generateEmbedding(text) {

    const controller = new AbortController()

    const timer = setTimeout(() => {
        controller.abort()
    }, 1000)


    try {
        const response = await fetch(`${process.env.OPEN_ROUTER_BASE_URL}/embeddings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`
            },
            body: JSON.stringify({
                "model": "openai/text-embedding-3-small",
                "input": text
            }),
            signal: controller.signal,

        })

        const data = await response.json()
        clearTimeout(timer)

        return data.data[0].embedding


    } catch (error) {
        clearTimeout(timer)
        throw error
    } finally {
        clearTimeout(timer)

    }

}

module.exports = {
    generateEmbedding
}