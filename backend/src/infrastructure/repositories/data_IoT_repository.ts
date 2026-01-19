import { DataIoTModel } from '../database/models/DataIoTModel';
import { DataIoT, DataIoTEntity } from '../../domain/entities/DataIoT';
import { IDataIoTRepository } from '../../domain/interfaces/interface_data_IoT_Repository';

export class DataIoTRepository implements IDataIoTRepository {
  async findAll(): Promise<DataIoT[]> {
    const documents = await DataIoTModel.find();
    return documents.map(doc => new DataIoTEntity({
      id: doc._id.toString(),
      temperature: doc.temperature,
      humidity: doc.humidity,
      timestamp: doc.timestamp
    }));
  }

  async create(data: Omit<DataIoT, 'id'>): Promise<DataIoT> {
    const document = await DataIoTModel.create({
      temperature: data.temperature,
      humidity: data.humidity,
      timestamp: data.timestamp
    });
    return new DataIoTEntity({
      id: document._id.toString(),
      temperature: document.temperature,
      humidity: document.humidity,
      timestamp: document.timestamp
    });
  }

  async getLatest(): Promise<DataIoT | null> {
    const document = await DataIoTModel.findOne().sort({ timestamp: -1 });
    if (!document) return null;
    return new DataIoTEntity({
      id: document._id.toString(),
      temperature: document.temperature,
      humidity: document.humidity,
      timestamp: document.timestamp
    });
  }
}
