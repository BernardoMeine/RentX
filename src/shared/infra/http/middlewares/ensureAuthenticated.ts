import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppErrors';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    req.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError('Invalid Token', 401)
  }
}