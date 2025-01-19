const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const labRoutes = require('./routes/labRoutes')
const weekdayMiddleware = require('./middlewares/weekdayMiddleware')

dotenv.config()

const app = express()

//app.use(weekdayMiddleware)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
});

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api rodando e ligeira viu')
})
app.use('/api', authRoutes)
app.use('/api', labRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});