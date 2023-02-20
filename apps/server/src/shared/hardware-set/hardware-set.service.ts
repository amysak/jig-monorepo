import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { HardwareSet } from "database/entities";

@Injectable()
export class HardwareSetService {
  constructor(
    @InjectRepository(HardwareSet)
    private hardwareSetRepository: Repository<HardwareSet>
  ) {}

  create(data: any) {
    return this.hardwareSetRepository.save(data);
  }

  async findByUserId(userId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<HardwareSet> = {
      user: { id: userId },
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
