import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const routesRental = Router()

const createRentalController = new CreateRentalController();

routesRental.post(
  "/:id", // não deveria ser o id no req.params, mas enquanto tu não arrumar os middlewares vai seguir assim
  // ensureAdmin,
  // ensureAuthenticated,
  createRentalController.handle);

export { routesRental }