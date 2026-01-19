import { Humidity } from '../../domain/entities/humidity';
import { InterfaceHumidityRepository } from '../../domain/interfaces/interface_humidity_repository';
import { InterfaceHumidityUseCase } from '../../domain/interfaces/interface_humidity_use_case';
import { getCDMXDate } from '../../infrastructure/utils/dateUtils';
import { PaginatedResponse } from '../dto/PaginationDTO';

export class HumidityUseCases implements InterfaceHumidityUseCase {
  constructor(private humidityRepository: InterfaceHumidityRepository) {}
  
  async getAllHumidities(): Promise<Humidity[]> {
    return this.humidityRepository.findAll();
  }

  async getAllHumiditiesPaginated(page: number, limit: number): Promise<PaginatedResponse<Humidity>> {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.max(1, Math.min(100, limit || 10));
    return this.humidityRepository.findAllPaginated(validPage, validLimit);
  }

  async recordHumidity( value: number, unit: string): Promise<Humidity> {
    if (unit != '%') {
      throw new Error('Unit is % required');
    }

    if (value < 30 || value > 70) {
      throw new Error('Humidity value must be between 30 and 70 percent');
    }

    return this.humidityRepository.create({
      value,
      unit: '%',
      timestamp: getCDMXDate()
    });
  }
 
  async getLatestHumidity(): Promise<Humidity | null> {
    return this.humidityRepository.getLatest();
  }

  async getLast15MinutesHumidities(): Promise<Humidity[]> {
    return this.humidityRepository.findLast15Minutes();
  }
}
