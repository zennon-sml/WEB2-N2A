const mongoose = require('mongoose')

const TempSchema = new mongoose.Schema(
    { temp: { type: String, required: true }},
    { timestamps: true },
)

const Temp = mongoose.model('Temp', TempSchema)
module.exports = Temp