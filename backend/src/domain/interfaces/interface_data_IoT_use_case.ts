import { DataIoT } from '../entities/DataIoT';

export interface IDataIoTUseCase {
  recordData(
    temperatureValue: number,
    temperatureUnit: string,
    humidityValue: number,
    humidityUnit: string
  ): Promise<DataIoT>;
  getAllData(): Promise<DataIoT[]>;
  getLatestData(): Promise<DataIoT | null>;
}
