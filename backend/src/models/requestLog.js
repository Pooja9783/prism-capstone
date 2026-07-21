const mongoose = require('mongoose')


const RequestLogSchema = new mongoose.Schema({
    team: { type: String, required: true },
    // apiKey: { type: String, required: true },
    providerModel: { type: String, required: true },
    provider:
    {
        name: { type: String, required: true },
        model: { type: String, required: true }
    },
    status: { type: String, required: true },
    usage: {
        promptTokens: { type: Number, required: true },
        completionTokens: { type: Number, required: true },
        totalTokens: { type: Number, required: true },
    },
    cost: { type: Number, required: true },
    cacheHit: { type: Boolean, required: true },
    fallback: { type: Boolean, required: true },
    latency: { type: Number, required: true },

},
    { timestamps: true }
)

const RequestLogModel = mongoose.model("RequestLog", RequestLogSchema)


module.exports = {
    RequestLogModel
}