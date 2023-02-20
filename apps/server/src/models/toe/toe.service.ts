import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { ToePlatform } from "database/entities";
import { GetToesDto } from "./dto";
import merge from "lodash.merge";
import { getRawSearch } from "common/lib";

@Injectable()
export class ToeService {
  constructor(
    @InjectRepository(ToePlatform)
    private toeRepository: Repository<ToePlatform>
  ) {}

  create(data: any) {
    return this.toeRepository.save(data);
  }

  async findByUserId(userId: number, opts: GetToesDto) {
    const defaultWhere: FindOptionsWhere<ToePlatform> = {
      user: { id: userId },
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

    const queryOpts: FindManyOptions<ToePlatform> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const queryResult = await this.toeRepository.find({
      ...queryOpts,
    });

    return { data: queryResult };
  }

  findOne(id: number) {
    return this.toeRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.toeRepository.update(id, data);
  }

  remove(id: number) {
    return this.toeRepository.delete(id);
  }
}
