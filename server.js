const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const labRoutes = require('./routes/labRoutes')
const weekdayMiddleware = require('./middlewares/weekdayMiddleware')

dotenv.config()

const app = express()

app.use(weekdayMiddleware)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
});

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', labRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//A.    Ter uma rota GET para '/videoTutorial', que envia, usando stream um vídeo sobre como usar a API, o vídeo deve ter pelo menos 1 minuto de duração.
//B.    Ter uma rota POST para ‘/bloquear/:lab’, que envia um emit para o canal ‘bloquear(lab)’ para todos os clientes ouvintes desse canal, criar um frontend HTML + Javascript simples, apenas para mostrar na tela quando alguém bloquear um laboratório, todos os clientes desse HTML devem ver a mensagem que algum laboratório foi bloqueado.
//C.   Usando sensor de temperatura, monitore a temperatura de 1 laboratório em tempo real, para isso, use um simulador de hardware
//D.   Ter uma rota ‘/temperaturaAtual’, que exibe a temperatura do laboratório naquele momento
//E.    Ter uma rota ‘/ligarLuz’, que liga a luz de 1 laboratório, para isso, utilize um simulador de hardware
//TODO A, B tomorrow