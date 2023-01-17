import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Hardware } from "database/entities";
import type { CreateHardwareDto } from "./dto/create-hardware.dto";
import type { UpdateHardwareDto } from "./dto/update-hardware.dto";

@Injectable()
export class HardwareService {
  constructor(
    @InjectRepository(Hardware)
    private hardwareRepository: Repository<Hardware>
  ) {}

  create(data: CreateHardwareDto) {
    const hardware = this.hardwareRepository.create(data);

    return hardware.save();
  }

  findAll() {
    return this.hardwareRepository.find();
  }

  findOne(id: number) {
    return this.hardwareRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateHardwareDto) {
    return this.hardwareRepository.update(id, data);
  }

  remove(id: number) {
    return this.hardwareRepository.delete(id);
  }
}
