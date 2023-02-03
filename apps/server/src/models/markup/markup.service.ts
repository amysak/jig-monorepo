import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { Markup } from "database/entities";
import type { CreateMarkupDto, UpdateMarkupDto } from "./dto";
import merge from "lodash.merge";
import { getRawSearch } from "common/lib";

@Injectable()
export class MarkupService {
  constructor(
    @InjectRepository(Markup)
    private markupRepository: Repository<Markup>
  ) {}

  create(data: CreateMarkupDto) {
    const markup = this.markupRepository.create(data);

    return markup.save();
  }

  async findByAccountId(accountId: number, opts: any) {
    const defaultWhere: FindOptionsWhere<Markup> = {
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

    const queryOpts: FindManyOptions<Markup> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountMarkups = await this.markupRepository.find({
      ...queryOpts,
    });

    return { data: accountMarkups };
  }

  findOne(id: number) {
    return this.markupRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateMarkupDto) {
    const markup = await this.markupRepository.findOneBy({ id });

    if (!markup) {
      throw new HttpException("Markup not found", 404);
    }

    const mergedMarkup = merge(markup, data);

    return this.markupRepository.save(mergedMarkup);
  }

  remove(id: number) {
    return this.markupRepository.delete(id);
  }
}
