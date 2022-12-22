import { Request, Response } from "express"
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";


class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const profileUserUseCase = container.resolve(ProfileUserUseCase)

    return
  }
}

export { ProfileUserController }