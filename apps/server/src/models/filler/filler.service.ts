import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filler } from "database/entities";

import type { Repository } from "typeorm";
import type { CreateFillerDto } from "./dto/create-filler.dto";
import type { UpdateFillerDto } from "./dto/update-filler.dto";

@Injectable()
export class FillerService {
  constructor(
    @InjectRepository(Filler)
    private fillerRepository: Repository<Filler>
  ) {}

  create(data: CreateFillerDto) {
    const filler = this.fillerRepository.create(data);

    return filler.save();
  }

  findAll() {
    return this.fillerRepository.find();
  }

  findOne(id: number) {
    return this.fillerRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateFillerDto) {
    return this.fillerRepository.update(id, data);
  }

  remove(id: number) {
    return this.fillerRepository.delete(id);
  }
}
