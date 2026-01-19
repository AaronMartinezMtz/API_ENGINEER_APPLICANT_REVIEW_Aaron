import { Temperature } from '../../domain/entities/temperature';
import { InterfaceTemperatureRepository } from '../../domain/interfaces/interface_temperature_repository';
import { TemperatureModel } from '../database/models/TemperatureModel';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export class TemperatureRepository implements InterfaceTemperatureRepository {

  async findAll(): Promise<Temperature[]> {
    const docs = await TemperatureModel.find().sort({ timestamp: -1 });
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginatedResponse<Temperature>> {
    const skip = (page - 1) * limit;
    const docs = await TemperatureModel.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await TemperatureModel.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return {
      data: docs.map(doc => this.mapToEntity(doc)),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  async create(data: Omit<Temperature, 'id'>): Promise<Temperature> {
    const temperature = new TemperatureModel(data);
    await temperature.save();
    return this.mapToEntity(temperature);
  }


  async getLatest(): Promise<Temperature | null> {
    const doc = await TemperatureModel.findOne().sort({ timestamp: -1 });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findLast15Minutes(): Promise<Temperature[]> {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const docs = await TemperatureModel.find({
      timestamp: { $gte: fifteenMinutesAgo }
    }).sort({ timestamp: -1 });
    return docs.map(doc => this.mapToEntity(doc));
  }

  private mapToEntity(doc: any): Temperature {
    return {
      id: doc._id.toString(),
      value: doc.value,
      unit: doc.unit,
      timestamp: doc.timestamp
    };
  }
}
