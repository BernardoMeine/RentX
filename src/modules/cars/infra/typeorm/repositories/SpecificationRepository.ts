import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification"


class SpecificationRepository implements ISpecificationRepository {

  private specifications : Repository<Specification>;

  constructor() {
    this.specifications = getRepository(Specification);
  }

  async create({ description, name}: ICreateSpecificationDTO): Promise<void> {

    const specification = this.specifications.create({ 
      description, 
      name 
    });

    await this.specifications.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOne({ name });
    return specification;
  }

}

export { SpecificationRepository } 
