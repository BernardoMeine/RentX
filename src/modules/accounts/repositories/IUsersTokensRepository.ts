import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokenDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"



interface IUsersTokensRepository {
  findByRequestToken(refresh_token: string): Promise<UserTokens>

  create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UserTokens>

  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>

  deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }