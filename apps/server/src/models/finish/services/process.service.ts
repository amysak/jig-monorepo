import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { FinishProcess } from "database/entities";
import { PaginationDto } from "type-defs";

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(FinishProcess)
    private processRepository: Repository<FinishProcess>
  ) {}

  create(data: any) {
    return this.processRepository.save(data);
  }

  // TODO: DTO
  async findByUserId(userId: number, opts?: PaginationDto) {
    const defaultWhere: FindOptionsWhere<FinishProcess> = {
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

    const queryOpts: FindManyOptions<FinishProcess> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const [queryResult, count] = await this.processRepository.findAndCount({
      ...queryOpts,
    });

    return { data: queryResult, count };
  }

  findOne(id: number) {
    return this.processRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.processRepository.update(id, data);
  }

  remove(id: number) {
    return this.processRepository.delete(id);
  }
}
