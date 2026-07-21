

const validateRequest = (req, res, next) => {

    const { model, messages } = req.body

    if (!model) {
        return res.status(400).json({ error: "Model is required" })
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages are required" })
    }
    next()
}


module.exports = validateRequest