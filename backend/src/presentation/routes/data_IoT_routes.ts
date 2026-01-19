import { Router } from 'express';
import { DataIoTController } from '../controllers/data_IoT_controller';
import { IDataIoTUseCase } from '../../domain/interfaces/interface_data_IoT_use_case';

export function createDataIoTRoutes(dataIoTUseCases: IDataIoTUseCase): Router {
  const router = Router();
  const controller = new DataIoTController(dataIoTUseCases);

  router.get('/latest', (req, res) => controller.getLatest(req, res));
  router.get('/', (req, res) => controller.getAll(req, res));
  router.post('/', (req, res) => controller.record(req, res));

  return router;
}
