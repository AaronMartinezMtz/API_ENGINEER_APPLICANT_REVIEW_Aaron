import { Humidity } from '../entities/humidity';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export interface InterfaceHumidityUseCase {
  getAllHumidities(): Promise<Humidity[]>;
  getAllHumiditiesPaginated(page: number, limit: number): Promise<PaginatedResponse<Humidity>>;
  recordHumidity( value: number, unit: string): Promise<Humidity>;
  getLatestHumidity(): Promise<Humidity | null>;
  getLast15MinutesHumidities(): Promise<Humidity[]>;
}
