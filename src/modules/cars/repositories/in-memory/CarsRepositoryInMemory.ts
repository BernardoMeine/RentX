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

  async findAvailable(
    brand?: string, 
    category_id?: string, 
    name?: string
  ): Promise<Car[]> {
    const all = this.cars
    .filter((car) => {
      if(
        car.available === true ||
        ((brand && car.brand === brand) || 
          (category_id && car.category_id === category_id) || 
          (name && car.name === name))
      ) {
        return car;
      } 
      return null;
    });
    
    return all;
  };

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

}

export { CarsRepositoryInMemory }