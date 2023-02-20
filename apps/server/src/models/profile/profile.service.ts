import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import type { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { getRawSearch } from "common/lib";
import { Profile } from "database/entities";

import { CreateProfileDto, GetProfilesDto, UpdateProfileDto } from "./dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  create(data: CreateProfileDto) {
    const profile = this.profileRepository.create(data);

    return profile.save();
  }

  async findByUserId(userId: number, opts: GetProfilesDto) {
    const defaultWhere: FindOptionsWhere<Profile> = {
      user: { id: userId },
    };
    if (opts.type) defaultWhere.type = opts.type;

    // This should be a common way to define orWhere searches
    const where = opts.search
      ? [
          merge(
            { ...defaultWhere },
            {
              name: getRawSearch(opts.search),
            }
          ),
        ]
      : defaultWhere;

    const queryOpts: FindManyOptions<Profile> = {
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: {
        ...(opts.orderBy ? { [opts.orderBy]: "DESC" } : {}),
        updatedAt: "DESC",
      },
      where,
    };

    const userOpenings = await this.profileRepository.find({
      relations: ["vendor"],
      ...queryOpts,
    });

    const count = await this.profileRepository.count({
      where: queryOpts.where,
    });

    return { count, data: userOpenings };
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  update(id: number, data: UpdateProfileDto) {
    return this.profileRepository.update(id, data);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
