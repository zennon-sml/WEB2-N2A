const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
});

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api now online')
})
app.use('/api', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`)
})