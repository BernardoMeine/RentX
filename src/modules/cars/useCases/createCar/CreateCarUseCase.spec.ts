import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppErrors"
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "testName",
      description: "testDesc",
      daily_rate: 1,
      license_plate: "testLicPla",
      fine_amount: 1,
      brand: "testBrand",
      category_id: "testCatId"
    });

    expect(car).toHaveProperty("id")
  });

  it("It should not be able to create a car with an existing license plate", async () => {

    await createCarUseCase.execute({
      name: "Car1",
      description: "CarDesc",
      daily_rate: 50,
      license_plate: "ABC1234",
      fine_amount: 30,
      brand: "CarBrand",
      category_id: "CarCatId"
    });

    await expect(createCarUseCase.execute({
      name: "Car2",
      description: "CarDesc",
      daily_rate: 50,
      license_plate: "ABC1234",
      fine_amount: 30,
      brand: "CarBrand",
      category_id: "CarCatId"
    })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("It should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "CarDesc",
      daily_rate: 50,
      license_plate: "ABCD-1234",
      fine_amount: 30,
      brand: "CarBrand",
      category_id: "CarCatId"
    });

    expect(car.available).toBe(true);
  })
})