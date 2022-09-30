import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';


const routesCar = Router();

const createCarController = new CreateCarController();

routesCar.post('/',ensureAuthenticated, ensureAdmin, createCarController.handle);

export { routesCar }