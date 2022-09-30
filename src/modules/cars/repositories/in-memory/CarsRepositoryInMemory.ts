import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  
  cars: Car[] = [];

  async findByLicense(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate)
    return car;
  }

  async create({
    brand,
    category_id, 
    description, 
    name, 
    license_plate,
    fine_amount,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car() 

    Object.assign(car, {
      brand,
      category_id, 
      description, 
      name, 
      license_plate,
      fine_amount,
      daily_rate,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory }