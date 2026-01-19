import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

// Importar conexión a base de datos
import { connectDatabase } from './infrastructure/database/mongoose';

// Importar repositorios
import { TemperatureRepository } from './infrastructure/repositories/temperature_repository';
import { HumidityRepository } from './infrastructure/repositories/humidity_repository';
import { DataIoTRepository } from './infrastructure/repositories/data_IoT_repository';

// Importar use cases
import { TemperatureUseCases } from './application/usecases/temperature_use_cases';
import { HumidityUseCases } from './application/usecases/humidity_use_cases';
import { DataIoTUseCases } from './application/usecases/data_IoT_use_cases';

// Importar rutas
import { createTemperatureRoutes } from './presentation/routes/temperature_routes';
import { createHumidityRoutes } from './presentation/routes/humidity_routes';
import { createDataIoTRoutes } from './presentation/routes/data_IoT_routes';

// Importar servicio de Socket
import { SocketService } from './infrastructure/socket/SocketService';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Dependency Injection
const temperatureRepository = new TemperatureRepository();
const humidityRepository = new HumidityRepository();
const dataIoTRepository = new DataIoTRepository();

const temperatureUseCases = new TemperatureUseCases(temperatureRepository);
const humidityUseCases = new HumidityUseCases(humidityRepository);
const dataIoTUseCases = new DataIoTUseCases(dataIoTRepository);

// Socket Service
const socketService = new SocketService(io, temperatureUseCases, humidityUseCases);

// Rutas
app.use('/api/data-iot', createDataIoTRoutes(dataIoTUseCases));
app.use('/api/temperature', createTemperatureRoutes(temperatureUseCases));
app.use('/api/humidity', createHumidityRoutes(humidityUseCases));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Backend con Clean Architecture',
    version: '1.0.0',
    sensors: {
      temperature: '/api/temperature',
      humidity: '/api/humidity'
    }
  });
});

// Socket.IO conexión
socketService.initializeSocket();

// Iniciar servidor
async function startServer() {
  try {
    // Conectar a MongoDB
    await connectDatabase();
    
    server.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
      
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();
