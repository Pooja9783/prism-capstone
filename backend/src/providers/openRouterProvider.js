

async function chatCompletion(messages, model, stream = false) {

    const controller = new AbortController()

    const timeout = setTimeout(() => {
        controller.abort()
    }, 10000)


    try {
        const response = await fetch(`${process.env.OPEN_ROUTER_BASE_URL}/chat/completions`, {
            signal: controller.signal,
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages,
                stream
            })
        })

        clearTimeout(timeout)


        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error.message || "Open Router request failed")
        }

        if (stream) {
            return response
        }

        const data = await response.json()

        return data
    } catch (error) {
        clearTimeout(timeout)
        if (error.name === 'AbortError') {
            throw new Error("Provided request timeout")
        }

        throw error
    }

}

module.exports = {
    chatCompletion
}