import { Request, Response } from 'express';
import { InterfaceTemperatureUseCase } from '../../domain/interfaces/interface_temperature_use_case';
import { CreateTemperatureDTO, UpdateTemperatureDTO, TemperatureResponseDTO } from '../../application/dto/TemperatureDTO';

export class TemperatureController {
  constructor(private temperatureUseCases: InterfaceTemperatureUseCase) {}


  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.temperatureUseCases.getAllTemperaturesPaginated(page, limit);
      
      const response = {
        data: result.data.map(
          (temp) =>
            new TemperatureResponseDTO(
              temp.id,
              temp.value,
              temp.unit,
              temp.timestamp,
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
      const { value, unit } = req.body;
      const dto = new CreateTemperatureDTO( value, unit);

      
      
      const temperature = await this.temperatureUseCases.recordTemperature(
        dto.value,
        dto.unit
      );
            
      const response = new TemperatureResponseDTO(
        temperature.id,
        temperature.value,
        temperature.unit,
        temperature.timestamp
      );
      res.status(201).json(response);
    } catch (error) {      

      res.status(400).json({ error: (error as Error).message });
    }
  }



  async getLatest(req: Request, res: Response): Promise<void> {
    try {
      const temperature = await this.temperatureUseCases.getLatestTemperature();

      if (!temperature) {
        res.status(404).json({ error: 'No temperature readings found' });
        return;
      }

      const response = new TemperatureResponseDTO(
        temperature.id,
        temperature.value,
        temperature.unit,
        temperature.timestamp
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getLast15Minutes(req: Request, res: Response): Promise<void> {
    try {
      const temperatures = await this.temperatureUseCases.getLast15MinutesTemperatures();
      const response = temperatures.map(
        (temp) =>
          new TemperatureResponseDTO(
            temp.id,
            temp.value,
            temp.unit,
            temp.timestamp,
          )
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
