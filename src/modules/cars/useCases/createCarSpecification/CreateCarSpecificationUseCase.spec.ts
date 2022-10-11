import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })

  it("should not be able to add the same specification twice to the same car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "testName", 
      description:"testDesc",
      daily_rate: 1,
      license_plate: "testLicPla",
      fine_amount: 1, 
      brand:"testBrand",
      category_id:"testCatId"
    });

    const specification = await specificationsRepositoryInMemory.create({
      name:"specTest",
      description:"descTest"
    })

    const specifications_id = [specification.id];

    const specficiationsCar =await createCarSpecificationUseCase.execute({
      car_id: car.id, 
      specifications_id
    });

    expect(specficiationsCar).toHaveProperty("specifications");
    expect(specficiationsCar.specifications.length).toBe(1);
  });

})