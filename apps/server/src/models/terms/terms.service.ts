import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { Terms } from "database/entities";
import merge from "lodash.merge";
import type { CreateTermsDto, UpdateTermsDto } from "./dto";
import { getRawSearch } from "common/lib";

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(Terms)
    private termsRepository: Repository<Terms>,
    private entityManager: EntityManager
  ) {}

  create(data: CreateTermsDto) {
    const terms = this.termsRepository.create(data);

    return terms.save();
  }

  async findByAccountId(accountId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<Terms> = {
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

    const queryOpts: FindManyOptions<Terms> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountTerms = await this.termsRepository.find({
      ...queryOpts,
    });

    return { data: accountTerms };
  }

  findOne(id: number) {
    return this.termsRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateTermsDto) {
    const terms = await this.termsRepository.findOneBy({ id });

    if (!terms) {
      throw new HttpException("Terms not found", 404);
    }

    return this.entityManager.save(merge(terms, data));
  }

  remove(id: number) {
    return this.termsRepository.delete(id);
  }
}
