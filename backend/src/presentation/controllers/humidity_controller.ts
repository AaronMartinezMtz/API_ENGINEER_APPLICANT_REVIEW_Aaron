import { Request, Response } from 'express';
import { InterfaceHumidityUseCase } from '../../domain/interfaces/interface_humidity_use_case';
import { CreateHumidityDTO, UpdateHumidityDTO, HumidityResponseDTO } from '../../application/dto/HumidityDTO';

export class HumidityController {
  constructor(private humidityUseCases: InterfaceHumidityUseCase) {}


  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.humidityUseCases.getAllHumiditiesPaginated(page, limit);
      
      const response = {
        data: result.data.map(
          (hum) =>
            new HumidityResponseDTO(
              hum.id,
              hum.value,
              hum.unit,
              hum.timestamp
            )
        ),
        pagination: result.pagination
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }


  async record(req: Request, res: Response): Promise<void> {
    try {
      const {  value, unit } = req.body;
      const dto = new CreateHumidityDTO(value, unit);

      const humidity = await this.humidityUseCases.recordHumidity(
        dto.value,
        dto.unit
      );

      const response = new HumidityResponseDTO(
        humidity.id,
        humidity.value,
        humidity.unit,
        humidity.timestamp
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }


  async getLatest(req: Request, res: Response): Promise<void> {
    try {
      const humidity = await this.humidityUseCases.getLatestHumidity();

      if (!humidity) {
        res.status(404).json({ error: 'No humidity readings found' });
        return;
      }

      const response = new HumidityResponseDTO(
        humidity.id,
        humidity.value,
        humidity.unit,
        humidity.timestamp
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getLast15Minutes(req: Request, res: Response): Promise<void> {
    try {
      const humidities = await this.humidityUseCases.getLast15MinutesHumidities();
      const response = humidities.map(
        (hum) =>
          new HumidityResponseDTO(
            hum.id,
            hum.value,
            hum.unit,
            hum.timestamp
          )
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
