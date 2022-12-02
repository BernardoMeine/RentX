import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByRequestToken(refresh_token: string): Promise<UserTokens> {
    const userTokens = this.userTokens.find(userTokens => userTokens.refresh_token === refresh_token)

    return userTokens;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersToken = this.userTokens.find(userTokens => userTokens.user_id === user_id && userTokens.refresh_token === refresh_token)

    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find(userTokens => userTokens.user_id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

}

export { UsersTokensRepositoryInMemory }