import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { Panel } from "database/entities";
import { GetPanelsDto } from "./dto";
import merge from "lodash.merge";
import { getRawSearch } from "common/lib";

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(Panel)
    private panelRepository: Repository<Panel>
  ) {}

  create(data: any) {
    return this.panelRepository.save(data);
  }

  // TODO: type return type here and elsewhere
  async findByUserId(userId: number, opts: GetPanelsDto) {
    const defaultWhere: FindOptionsWhere<Panel> = {
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

    const queryOpts: FindManyOptions<Panel> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const queryResult = await this.panelRepository.find({
      ...queryOpts,
    });

    return { data: queryResult };
  }

  findOne(id: number) {
    return this.panelRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.panelRepository.update(id, data);
  }

  remove(id: number) {
    return this.panelRepository.delete(id);
  }
}
