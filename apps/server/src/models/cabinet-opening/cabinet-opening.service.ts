import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { CabinetOpening } from "database/entities";
import type { CreateCabinetOpeningDto } from "./dto/create-cabinet-opening.dto";
import type { UpdateCabinetOpeningDto } from "./dto/update-cabinet-opening.dto";

@Injectable()
export class CabinetOpeningService {
  constructor(
    @InjectRepository(CabinetOpening)
    private cabinetOpeningRepository: Repository<CabinetOpening>
  ) {}

  create(data: CreateCabinetOpeningDto) {
    const cabinetOpening = this.cabinetOpeningRepository.create(data);

    return cabinetOpening.save();
  }

  findAll() {
    return this.cabinetOpeningRepository.find();
  }

  findOne(id: number) {
    return this.cabinetOpeningRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateCabinetOpeningDto) {
    return this.cabinetOpeningRepository.update(id, data);
  }

  remove(id: number) {
    return this.cabinetOpeningRepository.delete(id);
  }
}
