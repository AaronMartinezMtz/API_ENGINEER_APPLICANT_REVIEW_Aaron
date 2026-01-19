import { Humidity } from '../../domain/entities/humidity';
import { InterfaceHumidityRepository } from '../../domain/interfaces/interface_humidity_repository';
import { HumidityModel } from '../database/models/HumidityModel';
import { PaginatedResponse } from '../../application/dto/PaginationDTO';

export class HumidityRepository implements InterfaceHumidityRepository {

  async findAll(): Promise<Humidity[]> {
    const docs = await HumidityModel.find().sort({ timestamp: -1 });
    return docs.map(doc => this.mapToEntity(doc));
  }

  async findAllPaginated(page: number, limit: number): Promise<PaginatedResponse<Humidity>> {
    const skip = (page - 1) * limit;
    const docs = await HumidityModel.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await HumidityModel.countDocuments();
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

  async create(data: Omit<Humidity, 'id'>): Promise<Humidity> {
    const humidity = new HumidityModel(data);
    await humidity.save();
    return this.mapToEntity(humidity);
  }

  async getLatest(): Promise<Humidity | null> {
    const doc = await HumidityModel.findOne().sort({ timestamp: -1 });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findLast15Minutes(): Promise<Humidity[]> {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const docs = await HumidityModel.find({
      timestamp: { $gte: fifteenMinutesAgo }
    }).sort({ timestamp: -1 });
    return docs.map(doc => this.mapToEntity(doc));
  }

  private mapToEntity(doc: any): Humidity {
    return {
      id: doc._id.toString(),
      value: doc.value,
      unit: doc.unit,
      timestamp: doc.timestamp
    };
  }
}
