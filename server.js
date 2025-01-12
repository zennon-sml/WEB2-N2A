const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api now online')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
})