const mongoose = require('mongoose')


const semanticCacheSchema = mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: Object,
        required: true
    },
    embedding: {
        type: [Number],
        default: []
    }

}, { timestamps: true })


const semanticCacheModel = new mongoose.model("semanticCache", semanticCacheSchema)

module.exports = {
    semanticCacheModel
}