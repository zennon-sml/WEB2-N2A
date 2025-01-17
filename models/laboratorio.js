const mongoose = require('mongoose')

const LaboratorioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    picture: { type: String, required: true }
})

const Laboratorio = mongoose.model('Laboratorio', LaboratorioSchema)
module.exports = Laboratorio