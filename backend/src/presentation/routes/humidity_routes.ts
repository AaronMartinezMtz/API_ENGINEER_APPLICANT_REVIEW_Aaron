import { Router } from 'express';
import { HumidityController } from '../controllers/humidity_controller';
import { InterfaceHumidityUseCase } from '../../domain/interfaces/interface_humidity_use_case';

export function createHumidityRoutes(humidityUseCases: InterfaceHumidityUseCase): Router {
  const router = Router();
  const controller = new HumidityController(humidityUseCases);

  router.get('/latest', (req, res) => controller.getLatest(req, res));
  router.get('/last-15-minutes', (req, res) => controller.getLast15Minutes(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.post('/', (req, res) => controller.record(req, res));

  return router;
}
