import { Router } from 'express';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';


import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';


const routesCar = Router();
import uploadConfig from '@config/upload'
import multer from 'multer';
import { deleteFile } from '@utils/file';

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesControler = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"))

routesCar.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
  );

routesCar.get('/available', listAvailableCarsController.handle);

routesCar.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle);

routesCar.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesControler.handle
)


export { routesCar }