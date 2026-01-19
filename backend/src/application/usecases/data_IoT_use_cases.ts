import { DataIoT } from '../../domain/entities/DataIoT';
import { IDataIoTRepository } from '../../domain/interfaces/interface_data_IoT_Repository';
import { IDataIoTUseCase } from '../../domain/interfaces/interface_data_IoT_use_case';

export class DataIoTUseCases implements IDataIoTUseCase {
  constructor(private repository: IDataIoTRepository) {}

  async recordData(
    temperatureValue: number,
    temperatureUnit: string,
    humidityValue: number,
    humidityUnit: string
  ): Promise<DataIoT> {
    const data = {
      temperature: {
        value: temperatureValue,
        unit: temperatureUnit
      },
      humidity: {
        value: humidityValue,
        unit: humidityUnit
      },
      timestamp: new Date()
    };
    return await this.repository.create(data);
  }

  async getAllData(): Promise<DataIoT[]> {
    return await this.repository.findAll();
  }

  async getLatestData(): Promise<DataIoT | null> {
    return await this.repository.getLatest();
  }
}
