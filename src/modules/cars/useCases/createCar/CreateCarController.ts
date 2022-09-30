import { Request, Response } from 'express';
import { container } from 'tsyringe'

import { CreateCarUseCase } from './CreateCarUseCase';


class CreateCarController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, category_id, description, name, license_plate, fine_amount,daily_rate} = req.body

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({ brand, category_id, description, name, license_plate, fine_amount,daily_rate });
    
    return res.status(201).json(car);
  };
};

export { CreateCarController } 