
const { chat } = require('../services/chatService')

const chatCompletions = async (req, res) => {

    const result = await chat(req)

    console.log(result);

    if (result.stream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.setHeader("x-prism-provider", result.metadata.provider);
        res.setHeader("x-prism-cache", result.metadata.cache);
        res.setHeader("x-prism-fallback", result.metadata.fallback);
        res.setHeader("x-prism-cost-usd", result.metadata.cost);

        res.flushHeaders();

        const reader = result.response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { done, value } = await reader.read()

            if (done) {
                break
            }
            const chunk = decoder.decode(value, { stream: true })
            res.write(chunk)

        }
        res.end()
    } else {
        res.json(result.response)
    }
}


module.exports = chatCompletions 