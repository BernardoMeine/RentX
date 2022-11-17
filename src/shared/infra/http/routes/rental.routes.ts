import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentals/ListRentalsByUserController";


const routesRental = Router()

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();


routesRental.post(
  "/",
  ensureAuthenticated,
  createRentalController.handle);

routesRental.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle);

routesRental.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
)

export { routesRental }