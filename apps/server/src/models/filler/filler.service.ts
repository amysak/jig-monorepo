import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Filler } from "database/entities";

import { GetFillersDto } from "./dto";

@Injectable()
export class FillerService {
  constructor(
    @InjectRepository(Filler)
    private fillerRepository: Repository<Filler>
  ) {}

  create(data: any) {
    return this.fillerRepository.save(data);
  }

  async findByAccountId(accountId: number, opts: GetFillersDto) {
    const defaultWhere: FindOptionsWhere<Filler> = {
      account: { id: accountId },
    };

    const where = opts.search
      ? [
          merge(
            { ...defaultWhere },
            {
              name: getRawSearch(opts.search),
            }
          ),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<Filler> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const queryResult = await this.fillerRepository.find({
      ...queryOpts,
    });

    return { data: queryResult };
  }

  findOne(id: number) {
    return this.fillerRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.fillerRepository.update(id, data);
  }

  remove(id: number) {
    return this.fillerRepository.delete(id);
  }
}
