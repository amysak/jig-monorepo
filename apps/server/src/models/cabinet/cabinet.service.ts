import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, In, Repository } from "typeorm";

import { Cabinet } from "database/entities";
import { WithCountDto } from "type-defs";

import { CreateCabinetDto, GetCabinetsDto, UpdateCabinetDto } from "./dto";
import mergeWith from "lodash.mergewith";

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

  async update(id: number, data: any) {
    const cabinet = await this.cabinetRepository.findOneBy({ id });

    if (!cabinet) {
      throw new HttpException("Job not found", 404);
    }

    const mergedCabinet = mergeWith(cabinet, data, (_, srcValue) => {
      if (srcValue?.id) {
        return { id: srcValue.id };
      }
    });

    const res = await this.cabinetRepository.save(mergedCabinet);
    console.log("res => ", res);
    return res;
  }

  remove(id: number) {
    return this.cabinetRepository.delete(id);
  }
}
