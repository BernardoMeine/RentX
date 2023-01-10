import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoryRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'
import { userRoutes } from './users.routes'
import { carRoutes } from './cars.routes'
import { rentalRoutes } from './rental.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use(authenticateRoutes);
router.use("/cars", carRoutes)
router.use("/rentals", rentalRoutes)
router.use("/password", passwordRoutes)

export { router };