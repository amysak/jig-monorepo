import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Model } from "database/entities";

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>
  ) {}

  create(data: any) {
    return this.modelRepository.save(data);
  }

  async findByUserId(userId: number) {
    return this.modelRepository.find({
      where: { user: { id: userId } },
      order: {
        updatedAt: "desc",
      },
    });
  }

  findOne(id: number) {
    return this.modelRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.modelRepository.update(id, data);
  }

  remove(id: number) {
    return this.modelRepository.delete(id);
  }
}
