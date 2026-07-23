
const { getConfig } = require("../services/configLoader")

const authenticateApiKey = (req, res, next) => {
    const config = getConfig()
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "unAuthorization" })
    }

    const apiKey = authorization.replace('Bearer ', "")
    const tenant = config.seedKeys.tenants.find((tenant) => tenant.virtual_key === apiKey)

    if (!tenant) {
        return res.status(401).json({ error: "Invalid Api key" })
    }

    req.tenant = tenant


    const isModelAllowed = req.tenant.model_allowlist.includes(req.body.model)


    if (!isModelAllowed) {
        return res.status(403).json({ error: "This Model is not allowed for API Key" })
    }

    next()

}

module.exports = {
    authenticateApiKey
}