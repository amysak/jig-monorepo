import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  FindManyOptions,
  FindOptionsWhere,
  In,
  Like,
  Raw,
  Repository,
} from "typeorm";

import { Cabinet } from "database/entities";
import { WithCountDto } from "type-defs";

import { CreateCabinetDto, GetCabinetsDto, UpdateCabinetDto } from "./dto";
import mergeWith from "lodash.mergewith";
import merge from "lodash.merge";
import { getRawSearch } from "common/lib";

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

  async findByAccountId(accountId: number, opts: GetCabinetsDto): Promise<any> {
    console.log("opts => ", opts);

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

    console.log("where => ", where);

    const queryOpts: FindManyOptions<Cabinet> = {
      skip: (opts.page - 1) * opts.limit,
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
