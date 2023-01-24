import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, In, Repository } from "typeorm";

import { Cabinet } from "database/entities";
import { WithCountDto } from "type-defs";

import { CreateCabinetDto, GetCabinetsDto, UpdateCabinetDto } from "./dto";

@Injectable()
export class CabinetService {
  constructor(
    @InjectRepository(Cabinet)
    private cabinetRepository: Repository<Cabinet>
  ) {}

  create(data: CreateCabinetDto) {
    const cabinet = this.cabinetRepository.create(data as Cabinet);

    return cabinet.save();
  }

  findAll() {
    return this.cabinetRepository.find();
  }

  async findByAccountId(
    accountId: number,
    opts: GetCabinetsDto
  ): Promise<WithCountDto<Cabinet>> {
    console.log("opts => ", opts);
    const queryOpts: FindManyOptions<Cabinet> = {
      skip: (opts.page - 1) * opts.limit,
      take: opts.limit,
      order: {
        favourite: "DESC",
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where: {
        ...(opts.type ? { type: In(opts.type) } : {}),
      },
    };

    const accountCabinets = await this.cabinetRepository.find({
      where: { account: { id: accountId } },
      relations: ["specifications"],
      ...queryOpts,
    });

    const count = await this.cabinetRepository.count({
      where: queryOpts.where,
    });

    return { count, data: accountCabinets };
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
