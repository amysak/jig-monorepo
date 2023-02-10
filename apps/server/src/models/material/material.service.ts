import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";

import { Material } from "database/entities";

import { GetMaterialsDto } from "./dto";

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>
  ) {}

  create(data: any) {
    return this.materialRepository.save(data);
  }

  async findByAccountId(accountId: number, opts: GetMaterialsDto) {
    let query = this.materialRepository
      .createQueryBuilder("material")
      .where("material.account_id = :accountId", { accountId });

    if (opts.purpose)
      query = query.andWhere("material.purpose IN (:...purpose)", {
        purpose: opts.purpose.split(","),
      });
    if (opts.type)
      query = query.andWhere("material.type = :type", { type: opts.type });

    if (opts.search)
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where("material.purpose like :search", {
            search: `%${opts.search}%`,
          })
            .orWhere("material.name like :search", {
              search: `%${opts.search}%`,
            })
            .orWhere("material.type like :search", {
              search: `%${opts.search}%`,
            });
        })
      );

    query = query
      .skip((opts.page - 1) * opts.limit || void 0)
      .take(opts.limit || void 0)
      .orderBy("material.updated_at", "DESC");

    if (opts.orderBy)
      query = query.addOrderBy(`material.${opts.orderBy}`, "DESC");

    const [data, count] = await query.getManyAndCount();

    return { data, count };
  }

  async getTypes(accountId: number) {
    const rawTypes = await this.materialRepository
      .createQueryBuilder("material")
      .where("material.account_id = :accountId", { accountId })
      .groupBy("material.type")
      .select("material.type", "type")
      .getRawMany();

    return rawTypes.map((rawType) => rawType.type);
  }

  findOne(id: number) {
    return this.materialRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.materialRepository.update(id, data);
  }

  remove(id: number) {
    return this.materialRepository.delete(id);
  }
}
