import { Request, Response } from "express"


class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response>
}

export { ProfileUserController }