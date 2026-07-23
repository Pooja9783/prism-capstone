

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

async function retry(fn, maxAttempts, initialBackOff, multiplier) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn()
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error
            }

            const backOffTime = initialBackOff * Math.pow(multiplier, attempt - 1)

            await sleep(backOffTime)
        }
    }
}


module.exports = {
    sleep,
    retry
}