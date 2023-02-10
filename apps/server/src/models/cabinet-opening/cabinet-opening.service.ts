import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { CabinetOpening } from "database/entities";
import type { CreateCabinetOpeningDto } from "./dto/create-cabinet-opening.dto";
import type { UpdateCabinetOpeningDto } from "./dto/update-cabinet-opening.dto";
import { GetOpeningsDto } from "./dto";
import merge from "lodash.merge";
import { getRawSearch } from "common/lib";

@Injectable()
export class CabinetOpeningService {
  constructor(
    @InjectRepository(CabinetOpening)
    private cabinetOpeningRepository: Repository<CabinetOpening>
  ) {}

  create(data: CreateCabinetOpeningDto) {
    const cabinetOpening = this.cabinetOpeningRepository.create(data);

    return cabinetOpening.save();
  }

  async findByAccountId(accountId: number, opts: GetOpeningsDto) {
    const defaultWhere: FindOptionsWhere<CabinetOpening> = {
      account: { id: accountId },
    };
    if (opts.category) defaultWhere.type = opts.category;

    // This should be a common way to define orWhere searches
    const where = opts.search
      ? [
          merge(
            { ...defaultWhere },
            {
              name: getRawSearch(opts.search),
            }
          ),
          merge(
            { ...defaultWhere },
            {
              model: getRawSearch(opts.search),
            }
          ),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<CabinetOpening> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountOpenings = await this.cabinetOpeningRepository.find({
      relations: ["vendor"],
      ...queryOpts,
    });

    const count = await this.cabinetOpeningRepository.count({
      where: queryOpts.where,
    });

    return { count, data: accountOpenings };
  }

  async getModelsForAccount(accountId: number) {
    const res = await this.cabinetOpeningRepository
      .createQueryBuilder("opening")
      .where("opening.account_id = :accountId", { accountId })
      .select("opening.model", "model")
      .distinct(true)
      .getRawMany();

    return res.map((r) => r.model);
  }

  findOne(id: number) {
    return this.cabinetOpeningRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateCabinetOpeningDto) {
    return this.cabinetOpeningRepository.update(id, data);
  }

  remove(id: number) {
    return this.cabinetOpeningRepository.delete(id);
  }
}
