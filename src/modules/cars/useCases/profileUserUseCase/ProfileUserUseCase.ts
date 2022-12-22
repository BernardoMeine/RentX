import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string): Promise<User> {
    const userId = await this.usersRepository.findById(id);

    return userId
  }
}

export { ProfileUserUseCase } 