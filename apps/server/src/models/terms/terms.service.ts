import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import {
  JobPreferences,
  MultiPaymentTerms,
  NetTerms,
  Terms,
} from "database/entities";
import merge from "lodash.merge";
import type { CreateTermsDto, UpdateTermsDto } from "./dto";

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

  findAll() {
    return this.termsRepository.find();
  }

  findOne(id: number) {
    return this.termsRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateTermsDto) {
    const terms = await this.termsRepository.findOneBy({ id });

    if (!terms) {
      throw new HttpException("Terms not found", 404);
    }

    return this.entityManager.save(
      terms.type === "multi" ? MultiPaymentTerms : NetTerms,
      merge(terms, data)
    );
  }

  remove(id: number) {
    return this.termsRepository.delete(id);
  }
}
