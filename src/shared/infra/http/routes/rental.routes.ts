import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";


const routesRental = Router()

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();


routesRental.post(
  "/",
  ensureAuthenticated,
  createRentalController.handle);

routesRental.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle);

export { routesRental }