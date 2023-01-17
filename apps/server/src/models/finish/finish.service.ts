import { Finish } from "database/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import type { CreateFinishDto } from "./dto/create-finish.dto";
import type { UpdateFinishDto } from "./dto/update-finish.dto";

@Injectable()
export class FinishService {
  constructor(
    @InjectRepository(Finish)
    private finishRepository: Repository<Finish>
  ) {}

  create(data: CreateFinishDto) {
    const finish = this.finishRepository.create(data);

    return finish.save();
  }

  findAll() {
    return this.finishRepository.find();
  }

  findOne(id: number) {
    return this.finishRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateFinishDto) {
    return this.finishRepository.update(id, data);
  }

  remove(id: number) {
    return this.finishRepository.delete(id);
  }
}
