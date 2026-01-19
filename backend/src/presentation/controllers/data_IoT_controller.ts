import { Request, Response } from 'express';
import { IDataIoTUseCase } from '../../domain/interfaces/interface_data_IoT_use_case';
import { CreateDataIoTDTO, DataIoTResponseDTO } from '../../application/dto/DataIoTDTO';

export class DataIoTController {
  constructor(private dataIoTUseCases: IDataIoTUseCase) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.dataIoTUseCases.getAllData();
      const response = data.map(
        (item) =>
          new DataIoTResponseDTO(
            item.id,
            item.temperature,
            item.humidity,
            item.timestamp
          )
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getLatest(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.dataIoTUseCases.getLatestData();
      if (!data) {
        res.status(404).json({ error: 'No data found' });
        return;
      }
      const response = new DataIoTResponseDTO(
        data.id,
        data.temperature,
        data.humidity,
        data.timestamp
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async record(req: Request, res: Response): Promise<void> {
    try {
      const { temperature, humidity } = req.body;

      if (!temperature || !humidity) {
        res.status(400).json({
          error: 'Se requieren temperature y humidity con value y unit'
        });
        return;
      }

      const dto = new CreateDataIoTDTO(
        temperature.value,
        temperature.unit,
        humidity.value,
        humidity.unit
      );

      const data = await this.dataIoTUseCases.recordData(
        dto.temperature.value,
        dto.temperature.unit,
        dto.humidity.value,
        dto.humidity.unit
      );

      const response = new DataIoTResponseDTO(
        data.id,
        data.temperature,
        data.humidity,
        data.timestamp
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
