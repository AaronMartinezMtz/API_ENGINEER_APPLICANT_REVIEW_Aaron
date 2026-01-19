import { Server as SocketIOServer, Socket } from 'socket.io';
import { TemperatureUseCases } from '../../application/usecases/temperature_use_cases';
import { HumidityUseCases } from '../../application/usecases/humidity_use_cases';
import { DataIoTUseCases } from '../../application/usecases/data_IoT_use_cases';

export class SocketService {
  constructor(
    private io: SocketIOServer,
    private temperatureUseCases: TemperatureUseCases,
    private humidityUseCases: HumidityUseCases
  ) {}

  /**
   * Inicializa los listeners de Socket.IO
   */
  public initializeSocket(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`📡 Cliente conectado: ${socket.id}`);

      // Evento para registrar lectura de temperatura
      socket.on('iot/sensors', async (data: {sensor: string; value: number}) => {
        try {
            if(data.sensor === 'TEMP'){
              const temperatureRecord = await this.temperatureUseCases.recordTemperature(
                data.value, 'C'
              );

              this.broadcastTemperature({ 
                value: temperatureRecord.value, 
                unit: temperatureRecord.unit, 
                timestamp: temperatureRecord.timestamp 
            } );

            }
            else{
              const humidityRecord = await this.humidityUseCases.recordHumidity(
                data.value, '%'
              );

              this.broadcastHumidity({ 
                  value: humidityRecord.value, 
                  unit: humidityRecord.unit, 
                  timestamp: humidityRecord.timestamp 
              });
            }            
        } catch (error: any) {
          console.error('❌ Data no register IoT:', error.message + ' - Data:' + data.value );
        }
      });


      // Evento para desconexión
      socket.on('disconnect', () => {
        console.log(`❌ Cliente desconectado: ${socket.id}`);
      });
    });
  }

  /**
   * Emitir temperatura a todos los clientes
   */
  public broadcastTemperature(data: {value: number, unit: string, timestamp: Date}): void {
    this.io.emit('temperature:update', data);
  }

  /**
   * Emitir humedad a todos los clientes
   */
  public broadcastHumidity(data: {value: number, unit: string, timestamp: Date}): void {
    this.io.emit('humidity:update', data);
  }
}
