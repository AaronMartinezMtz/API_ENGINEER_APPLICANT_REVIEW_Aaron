import { Router } from 'express';
import { TemperatureController } from '../controllers/temperature_controller';
import { InterfaceTemperatureUseCase } from '../../domain/interfaces/interface_temperature_use_case';

export function createTemperatureRoutes(temperatureUseCases: InterfaceTemperatureUseCase): Router {
  const router = Router();
  const controller = new TemperatureController(temperatureUseCases);

  router.get('/latest', (req, res) => controller.getLatest(req, res));
  router.get('/last-15-minutes', (req, res) => controller.getLast15Minutes(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.post('/', (req, res) => controller.record(req, res));

  return router;
}
