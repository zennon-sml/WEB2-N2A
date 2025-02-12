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
      origin: "*",  // Permite conexões de qualquer origem (ajuste conforme necessário)
      methods: ["GET", "POST"]
  }
});

app.use(weekdayMiddleware)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
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

//DONE A.    Ter uma rota GET para '/videoTutorial', que envia, usando stream um vídeo sobre como usar a API, o vídeo deve ter pelo menos 1 minuto de duração.
//DONE B.    Ter uma rota POST para ‘/bloquear/:lab’, que envia um emit para o canal ‘bloquear(lab)’ para todos os clientes ouvintes desse canal, criar um frontend HTML + Javascript simples, apenas para mostrar na tela quando alguém bloquear um laboratório, todos os clientes desse HTML devem ver a mensagem que algum laboratório foi bloqueado.
//DONE C.   Usando sensor de temperatura, monitore a temperatura de 1 laboratório em tempo real, para isso, use um simulador de hardware
//DONE D.   Ter uma rota ‘/temperaturaAtual’, que exibe a temperatura do laboratório naquele momento
//E.    Ter uma rota ‘/ligarLuz’, que liga a luz de 1 laboratório, para isso, utilize um simulador de hardware
