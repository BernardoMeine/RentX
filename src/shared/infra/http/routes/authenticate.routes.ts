import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const routesAuthenticate = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

routesAuthenticate.post('/sessions', authenticateUserController.handle)
routesAuthenticate.post('/refresh-token', refreshTokenController.handle)


export { routesAuthenticate } 