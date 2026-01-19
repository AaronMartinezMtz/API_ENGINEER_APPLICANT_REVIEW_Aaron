import { Temperature } from '../../domain/entities/temperature';
import { InterfaceTemperatureRepository } from '../../domain/interfaces/interface_temperature_repository';
import { InterfaceTemperatureUseCase } from '../../domain/interfaces/interface_temperature_use_case';
import { getCDMXDate } from '../../infrastructure/utils/dateUtils';
import { PaginatedResponse } from '../dto/PaginationDTO';

export class TemperatureUseCases implements InterfaceTemperatureUseCase {
  constructor(private temperatureRepository: InterfaceTemperatureRepository) {}

  async getAllTemperatures(): Promise<Temperature[]> {
    return await this.temperatureRepository.findAll();
  }

  async getAllTemperaturesPaginated(page: number, limit: number): Promise<PaginatedResponse<Temperature>> {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.max(1, Math.min(100, limit || 10));
    return await this.temperatureRepository.findAllPaginated(validPage, validLimit);
  }

  async recordTemperature( value: number, unit: string): Promise<Temperature> {
    if (unit != 'C') {
      throw new Error('Unit is C required');
    }

    if (value < 10 || value > 25) {
      throw new Error('Temperature value must be between [10-25] Celsius');
    }

    return await this.temperatureRepository.create({
      value,
      unit: 'C',
      timestamp: getCDMXDate()
    });
  }



  async getLatestTemperature(): Promise<Temperature | null> {
    return this.temperatureRepository.getLatest();
  }

  async getLast15MinutesTemperatures(): Promise<Temperature[]> {
    return this.temperatureRepository.findLast15Minutes();
  }
}
