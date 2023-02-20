import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Equipment } from "database/entities";
import { GetEquipmentDto } from "./dto";

// TODO: DTO
@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>
  ) {}

  create(data: Equipment) {
    const cabinetEquipment = this.equipmentRepository.create(data);

    return cabinetEquipment.save();
  }

  async findByUserId(userId: number, opts: GetEquipmentDto) {
    const defaultWhere: FindOptionsWhere<Equipment> = {
      user: { id: userId },
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

    // TODO: Add checking for relations other than user (?)
    const queryOpts: FindManyOptions<Equipment> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const userEquipment = await this.equipmentRepository.find({
      ...queryOpts,
    });

    const count = await this.equipmentRepository.count({
      where: queryOpts.where,
    });

    return { count, data: userEquipment };
  }

  findOne(id: number) {
    return this.equipmentRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.equipmentRepository.update(id, data);
  }

  remove(id: number) {
    return this.equipmentRepository.delete(id);
  }
}
