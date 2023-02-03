import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { Finish } from "database/entities";
import { getRawSearch } from "common/lib";

import { GetFinishesDto } from "./dto";

@Injectable()
export class FinishService {
  constructor(
    @InjectRepository(Finish)
    private finishRepository: Repository<Finish>
  ) {}

  create(data: any) {
    return this.finishRepository.save(data);
  }

  // TODO: DTO
  async findByAccountId(accountId: number, opts: GetFinishesDto) {
    const defaultWhere: FindOptionsWhere<Finish> = {
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

    const queryOpts: FindManyOptions<Finish> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    if (opts.group) {
      const queryResult = await this.finishRepository.find({
        ...queryOpts,
        skip: void 0,
        take: void 0,
      });

      const { colors, processes } = queryResult.reduce((acc, curr) => {
        const key = curr.type === "process" ? "processes" : "colors";

        return { ...acc, [key]: [...(acc[key] || []), curr] };
      }, {}) as { colors: Finish[]; processes: Finish[] };

      return { colors, processes };
    }

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
