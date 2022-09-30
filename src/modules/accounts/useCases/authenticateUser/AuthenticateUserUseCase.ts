import { injectable, inject } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppErrors";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest):Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, "bb12b281a11b087b1d0cc413b3ed8ac9", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
    token ,
    user: {
      name: user.name,
      email: user.email
    },
  }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase } 