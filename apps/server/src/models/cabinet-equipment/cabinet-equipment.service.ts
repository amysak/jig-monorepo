import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import merge from "lodash.merge";

import { CabinetEquipment } from "database/entities";
import { getRawSearch } from "common/lib";

import { GetEquipmentDto } from "./dto";

// TODO: DTO
@Injectable()
export class CabinetEquipmentService {
  constructor(
    @InjectRepository(CabinetEquipment)
    private cabinetEquipmentRepository: Repository<CabinetEquipment>
  ) {}

  create(data: CabinetEquipment) {
    const cabinetEquipment = this.cabinetEquipmentRepository.create(data);

    return cabinetEquipment.save();
  }

  async findByAccountId(accountId: number, opts: GetEquipmentDto) {
    const defaultWhere: FindOptionsWhere<CabinetEquipment> = {
      account: { id: accountId },
    };
    if (opts.category) defaultWhere.category = getRawSearch(opts.category);

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
              classification: getRawSearch(opts.search),
            }
          ),
        ]
      : defaultWhere;

    // TODO: Add checking for relations other than account (?)
    const queryOpts: FindManyOptions<CabinetEquipment> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const accountEquipment = await this.cabinetEquipmentRepository.find({
      ...queryOpts,
    });

    const count = await this.cabinetEquipmentRepository.count({
      where: queryOpts.where,
    });

    return { count, data: accountEquipment };
  }

  findOne(id: number) {
    return this.cabinetEquipmentRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.cabinetEquipmentRepository.update(id, data);
  }

  remove(id: number) {
    return this.cabinetEquipmentRepository.delete(id);
  }
}
