import { Humidity } from '../entities/humidity';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export interface InterfaceHumidityRepository {
  findAll(): Promise<Humidity[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginatedResponse<Humidity>>;
  create(humidity: Omit<Humidity, 'id'>): Promise<Humidity>;
  getLatest(): Promise<Humidity | null>;
  findLast15Minutes(): Promise<Humidity[]>;
}
