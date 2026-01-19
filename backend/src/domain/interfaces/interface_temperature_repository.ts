import { Temperature } from '../entities/temperature';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export interface InterfaceTemperatureRepository {
  findAll(): Promise<Temperature[]>;
  findAllPaginated(page: number, limit: number): Promise<PaginatedResponse<Temperature>>;
  create(temperature: Omit<Temperature, 'id'>): Promise<Temperature>;
  getLatest(): Promise<Temperature | null>;
  findLast15Minutes(): Promise<Temperature[]>;
}
