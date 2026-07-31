async function chatCompletion(messages, model, stream = false) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10000);

    try {
        const response = await fetch(
            `${process.env.OPEN_ROUTER_BASE_URL}/chat/completions`,
            {
                signal: controller.signal,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model,
                    messages,
                    stream,
                    ...(stream && {
                        stream_options: {
                            include_usage: true
                        }
                    })
                })
            }
        );

        clearTimeout(timeout);

        if (!response.ok) {
            const error = await response.json();

            throw new Error(
                error.error?.message || "OpenRouter request failed"
            );
        }

        if (stream) {
            return response;
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeout);

        if (error.name === "AbortError") {
            throw new Error("Provider request timed out");
        }

        throw error;
    }
}

module.exports = {
    chatCompletion
};