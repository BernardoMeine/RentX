import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';



const routesCar = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

routesCar.post(
  '/',
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
  );

routesCar.get('/available', listAvailableCarsController.handle);

export { routesCar }