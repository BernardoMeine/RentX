import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { injectable, inject } from "tsyringe"

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount:number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(
    { name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id,
    }: IRequest): Promise<Car> {

      const carAlreadyExists = await this.carsRepository.findByLicense(license_plate)
      
      if (carAlreadyExists) {
        throw new AppError ("Car already exists!");
      }

      const car = await this.carsRepository.create({
        brand,
        category_id, 
        description, 
        name, 
        license_plate,
        fine_amount,
        daily_rate,
      });

      return car;
  }
}

export { CreateCarUseCase } 