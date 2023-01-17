import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";

import { Markup } from "database/entities";
import type { CreateMarkupDto, UpdateMarkupDto } from "./dto";
import merge from "lodash.merge";

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

  findAll() {
    return this.markupRepository.find();
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
