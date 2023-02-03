import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { MaterialSet } from "database/entities";
import { getRawSearch } from "common/lib";

import { GetFinishesDto } from "./dto";

@Injectable()
export class MaterialSetService {
  constructor(
    @InjectRepository(MaterialSet)
    private materialSetRepository: Repository<MaterialSet>
  ) {}

  create(data: any) {
    return this.materialSetRepository.save(data);
  }

  async findByAccountId(accountId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<MaterialSet> = {
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

    const queryOpts: FindManyOptions<MaterialSet> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const materialSets = await this.materialSetRepository.find({
      ...queryOpts,
    });

    return { data: materialSets };
  }

  findOne(id: number) {
    return this.materialSetRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.materialSetRepository.update(id, data);
  }

  remove(id: number) {
    return this.materialSetRepository.delete(id);
  }
}
