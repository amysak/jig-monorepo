import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Accessory } from "database/entities";
import type { CreateAccessoryDto } from "./dto/create-accessory.dto";
import type { UpdateAccessoryDto } from "./dto/update-accessory.dto";

@Injectable()
export class AccessoryService {
  constructor(
    @InjectRepository(Accessory)
    private accessoryRepository: Repository<Accessory>
  ) {}

  create(data: CreateAccessoryDto) {
    const accessory = this.accessoryRepository.create(data);

    return accessory.save();
  }

  findAll() {
    return this.accessoryRepository.find();
  }

  findOne(id: number) {
    return this.accessoryRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateAccessoryDto) {
    return this.accessoryRepository.update(id, data);
  }

  remove(id: number) {
    return this.accessoryRepository.delete(id);
  }
}
