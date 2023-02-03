import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { HardwareSet } from "database/entities";
import { getRawSearch } from "common/lib";

import { GetFinishesDto } from "./dto";

@Injectable()
export class HardwareSetService {
  constructor(
    @InjectRepository(HardwareSet)
    private hardwareSetRepository: Repository<HardwareSet>
  ) {}

  create(data: any) {
    return this.hardwareSetRepository.save(data);
  }

  async findByAccountId(accountId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<HardwareSet> = {
      account: { id: accountId },
    };

    // This should be a common way to define orWhere
    const where = opts.search
      ? [
          merge(defaultWhere, {
            name: getRawSearch(opts.search),
          }),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<HardwareSet> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const hardwareSets = await this.hardwareSetRepository.find({
      ...queryOpts,
    });

    return { data: hardwareSets };
  }

  findOne(id: number) {
    return this.hardwareSetRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.hardwareSetRepository.update(id, data);
  }

  remove(id: number) {
    return this.hardwareSetRepository.delete(id);
  }
}
