import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController} from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';


const routesCategories = Router();
const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

routesCategories.post(
  '/', 
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
  );

routesCategories.get('/', listCategoriesController.handle);

routesCategories.post(
  "/import", 
  upload.single("file"),
  ensureAuthenticated, 
  ensureAdmin, 
  importCategoryController.handle
  );

export { routesCategories };
