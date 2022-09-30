import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppErrors';


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401)
  }

  const [, token] = authHeader.split(" ");

  try{
    const { sub: user_id } = verify(token, 'bb12b281a11b087b1d0cc413b3ed8ac9') as IPayload

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id)

    if(!user) {
      throw new AppError('User does not exists!', 401)
    }

    req.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError('Invalid Token', 401)
  }
}