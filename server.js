const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const labRoutes = require('./routes/labRoutes')
const videoRoutes = require('./routes/videoRoute')
const tempRoutes = require('./routes/tempRoutes')
const weekdayMiddleware = require('./middlewares/weekdayMiddleware')
const path = require("path")
const http = require('http');
const { Server } = require('socket.io');


dotenv.config()

const app = express()
// Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});

app.use(weekdayMiddleware)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1)
});

app.use(express.json())
app.use(authRoutes)
app.use(labRoutes)
app.use(videoRoutes)
app.use(tempRoutes)
app.use(express.static(path.join(__dirname, "public")));


// Socket
// Bloquear Lab
app.post('/bloquear/:lab', (req, res) => {
  const lab = req.params.lab;
  io.emit('bloquearLab', lab);
  res.send(`Laboratório ${lab} bloqueado!`);
});

// Temperaturas
app.post('/temperatura/:temp', (req, res) => {
  const { temp } = req.params;
  io.emit('atualizarTemperatura', temp ); 
  res.send(`Temperatura do laboratório atualizada para ${temp}°C`);
});

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  socket.on('disconnect', () => {
      console.log('Usuário desconectado');
  });
});

app.get('/ligarluz', (req, res) => {
  res.status(200).send("Ligado")
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

