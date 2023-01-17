import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Material } from "database/entities";
import type { CreateMaterialDto } from "./dto/create-material.dto";
import type { UpdateMaterialDto } from "./dto/update-material.dto";

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>
  ) {}

  create(data: CreateMaterialDto) {
    const material = this.materialRepository.create(data);

    return material.save();
  }

  findAll() {
    return this.materialRepository.find();
  }

  findOne(id: number) {
    return this.materialRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateMaterialDto) {
    return this.materialRepository.update(id, data);
  }

  remove(id: number) {
    return this.materialRepository.delete(id);
  }
}
