import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';

const routesUser = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();


routesUser.post('/', createUserController.handle)

routesUser.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

routesUser.get(
  '/profile',
  ensureAuthenticated,
  profileUserController.handle
)

export { routesUser };