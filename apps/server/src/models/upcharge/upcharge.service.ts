import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { getRawSearch } from "common/lib";
import { Upcharge } from "database/entities";

@Injectable()
export class UpchargeService {
  constructor(
    @InjectRepository(Upcharge)
    private upchargeRepository: Repository<Upcharge>
  ) {}

  create(data: any) {
    return this.upchargeRepository.create(data);
  }

  async findByAccountId(accountId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<Upcharge> = {
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

    const queryOpts: FindManyOptions<Upcharge> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountUpcharges = await this.upchargeRepository.find({
      ...queryOpts,
    });

    return { data: accountUpcharges };
  }

  findOne(id: number) {
    return this.upchargeRepository.findOne({ where: { id } });
  }

  async update(id: number, data: any) {
    const markup = await this.upchargeRepository.findOneBy({ id });

    if (!markup) {
      throw new HttpException("Markup not found", 404);
    }

    const mergedMarkup = merge(markup, data);

    return this.upchargeRepository.save(mergedMarkup);
  }

  remove(id: number) {
    return this.upchargeRepository.delete(id);
  }
}
