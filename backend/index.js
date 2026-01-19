// Importar dependencias
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando con Socket.IO');
});

io.on('connection', (socket) => {});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
