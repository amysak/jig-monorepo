import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { Paint } from "database/entities";
import { getRawSearch } from "common/lib";

import { GetPaintsDto } from "../dto";

@Injectable()
export class PaintService {
  constructor(
    @InjectRepository(Paint)
    private paintRepository: Repository<Paint>
  ) {}

  create(data: any) {
    return this.paintRepository.save(data);
  }

  // TODO: DTO
  async findByUserId(userId: number, opts: GetPaintsDto) {
    const defaultWhere: FindOptionsWhere<Paint> = {
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

    const queryOpts: FindManyOptions<Paint> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const [queryResult, count] = await this.paintRepository.findAndCount({
      ...queryOpts,
    });

    return { data: queryResult, count };
  }

  findOne(id: number) {
    return this.paintRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.paintRepository.update(id, data);
  }

  remove(id: number) {
    return this.paintRepository.delete(id);
  }
}
