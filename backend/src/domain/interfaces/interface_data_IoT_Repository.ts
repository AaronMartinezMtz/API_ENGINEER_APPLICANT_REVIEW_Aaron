import { DataIoT } from '../entities/DataIoT';

export interface IDataIoTRepository {
  findAll(): Promise<DataIoT[]>;
  create(data: Omit<DataIoT, 'id'>): Promise<DataIoT>;
  getLatest(): Promise<DataIoT | null>;
}
