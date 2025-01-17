const mongoose = require('mongoose')

const LabSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    picture: { type: String, required: true }
})

const Lab = mongoose.model('Lab', LabSchema)
module.exports = Lab