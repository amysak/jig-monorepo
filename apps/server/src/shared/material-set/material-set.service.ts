import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { MaterialSet } from "database/entities";

@Injectable()
export class MaterialSetService {
  constructor(
    @InjectRepository(MaterialSet)
    private materialSetRepository: Repository<MaterialSet>
  ) {}

  // TODO: type data
  create(accountId: number, data: any) {
    return this.materialSetRepository.save({ ...data, account: accountId });
  }

  async findByAccountId(
    accountId: number,
    // TODO: move to separate type for reusability
    opts: { search?: string; orderBy?: string }
  ) {
    const defaultWhere: FindOptionsWhere<MaterialSet> = {
      account: { id: accountId },
      // It just doesn't work :)
      // room: IsNull()
    };

    // This should be a common way to define orWhere
    const where = opts.search
      ? [
          merge(defaultWhere, {
            name: getRawSearch(opts.search),
          }),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<MaterialSet> = {
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const materialSets = await this.materialSetRepository.find({
      relations: {
        account: true,
        room: true,
      },
      ...queryOpts,
    });

    const filtered = materialSets.filter((set) => !set.room);

    return { data: filtered };
  }

  async assign(id: number, { setId }: { setId: number }) {
    const set = await this.materialSetRepository.findOne({
      where: { id: setId },
    });

    return this.materialSetRepository.save({
      ...set,
      id,
    });
  }

  findOne(id: number) {
    return this.materialSetRepository.findOne({ where: { id } });
  }

  update(id: number, data: any) {
    return this.materialSetRepository.update(id, data);
  }

  remove(id: number) {
    return this.materialSetRepository.delete(id);
  }
}
