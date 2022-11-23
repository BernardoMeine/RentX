import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalsUseCase";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open for the same user", async () => {

    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24hours,
      user_id: "321"
    })

    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "121212",
      expected_return_date: dayAdd24hours,
    })

    ).rejects.toEqual(new AppError("There's a rental in progress for the user!"))

  })

  it("should not be able to create a new rental if there is another open for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24hours,
      user_id: "321"
    })

    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "1111",
      expected_return_date: dayAdd24hours,
    })

    ).rejects.toEqual(new AppError("Car is unvailable"))

  });

  it("should not be able to create a new rental with less than 24 hours", async () => {

    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayjs().toDate(),
    })
    ).rejects.toEqual(new AppError("The rental must last at least 24 hours"))

  });

})