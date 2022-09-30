import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const routesAuthenticate = Router();

const authenticateUserController = new AuthenticateUserController();

routesAuthenticate.post('/sessions', authenticateUserController.handle)

export { routesAuthenticate } 