import { Request, Response } from "express";

import { container } from "tsyringe"
import { CreateRentalUseCase } from "./CreateRentalsUseCase"

class CreateRentalController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { expected_return_date, car_id } = req.body
    // errado -> o id não vai no req.params
    const { id } = req.params
    // certo -> o id vai no req.user (usuário deverá estar logado e autenticado para fazer a req de aluguel)

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_return_date
    })

    return res.status(201).json(rental)
  }
}

export { CreateRentalController }