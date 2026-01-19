import { Temperature } from '../entities/temperature';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export interface InterfaceTemperatureUseCase {
  getAllTemperatures(): Promise<Temperature[]>;
  getAllTemperaturesPaginated(page: number, limit: number): Promise<PaginatedResponse<Temperature>>;
  recordTemperature( value: number, unit: string): Promise<Temperature>;
  getLatestTemperature(): Promise<Temperature | null>;
  getLast15MinutesTemperatures(): Promise<Temperature[]>;
}
