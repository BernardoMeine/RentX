import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { injectable, inject } from "tsyringe"

interface IRequest {
  category_id: string;
  
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable();
    return cars;
  }

}

export { ListCarsUseCase } 