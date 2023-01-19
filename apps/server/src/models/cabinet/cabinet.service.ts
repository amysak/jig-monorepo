import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Cabinet } from "database/entities";
import { DEFAULT_PAGE_SIZE, PaginationDto, WithCountDto } from "type-defs";
import type { CreateCabinetDto } from "./dto/create-cabinet.dto";
import type { UpdateCabinetDto } from "./dto/update-cabinet.dto";

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>
  ) {}

  create(data: CreateCabinetDto) {
    const cabinet = this.cabinetRepository.create(data);

    return cabinet.save();
  }

  findAll() {
    return this.cabinetRepository.find();
  }

  async findByAccountId(
    accountId: number,
    opts?: PaginationDto
  ): Promise<WithCountDto<Cabinet>> {
    const limit = opts?.limit ?? DEFAULT_PAGE_SIZE;

    const accountCabinets = await this.cabinetRepository.find({
      where: { account: { id: accountId } },
      skip: (opts.page - 1) * limit,
      take: limit,
    });

    return { count: accountCabinets.length, data: accountCabinets };
  }

  findOne(id: number) {
    return this.cabinetRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateCabinetDto) {
    return this.cabinetRepository.update(id, data);
  }

  remove(id: number) {
    return this.cabinetRepository.delete(id);
  }
}
