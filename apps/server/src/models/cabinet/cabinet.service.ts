import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import mergeWith from "lodash.mergewith";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Cabinet } from "database/entities";

import { CreateCabinetDto, GetCabinetsDto } from "./dto";

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

  async findByAccountId(accountId: number, opts: GetCabinetsDto) {
    const defaultWhere: FindOptionsWhere<Cabinet> = {
      account: { id: accountId },
    };
    if (opts.type) defaultWhere.type = opts.type;

    // This should be a common way to define orWhere
    const where = opts.search
      ? [
          merge(defaultWhere, {
            name: getRawSearch(opts.search),
          }),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<Cabinet> = {
      // left-side returns NaN
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        favourite: "DESC",
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountCabinets = await this.cabinetRepository.find({
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
