import { Router } from 'express';

import { routesAuthenticate } from './authenticate.routes';
import { routesCategories } from './categories.routes'
import { routesSpecification } from './specification.routes'
import { routesUser } from './users.routes'
import { routesCar } from './cars.routes'
import { routesRental } from './rental.routes';
import { routesPassword } from './password.routes';

const router = Router();

router.use("/categories", routesCategories);
router.use("/specifications", routesSpecification);
router.use("/users", routesUser);
router.use(routesAuthenticate);
router.use("/cars", routesCar)
router.use("/rentals", routesRental)
router.use("/password", routesPassword)

export { router };