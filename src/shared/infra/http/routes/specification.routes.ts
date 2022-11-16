import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const routesSpecification = Router();

const createSpecificationController = new CreateSpecificationController()

routesSpecification.post(
  '/', 
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
  );

export { routesSpecification }