import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Vendor } from "database/entities";

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private finishRepository: Repository<Vendor>
  ) {}

  create(data: any) {
    return this.finishRepository.save(data);
  }

  // TODO: DTO
  async findByUserId(userId: number, opts: { search?: string }) {
    const defaultWhere: FindOptionsWhere<Vendor> = {
      user: { id: userId },
    };

    const where = opts.search
      ? merge(
          { ...defaultWhere },
          {
            name: getRawSearch(opts.search),
          }
        )
      : defaultWhere;

    const queryOpts: FindManyOptions<Vendor> = {
      order: {
        updatedAt: "DESC",
      },
      where,
    };

    const [queryResult, count] = await this.finishRepository.findAndCount({
      ...queryOpts,
    });

    return { data: queryResult, count };
  }

  findOne(id: number) {
    return this.finishRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.finishRepository.update(id, data);
  }

  remove(id: number) {
    return this.finishRepository.delete(id);
  }
}
