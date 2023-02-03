import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import merge from "lodash.merge";
import mergeWith from "lodash.mergewith";
import { DeepPartial, EntityManager, Repository } from "typeorm";

import { Job } from "database/entities";
import { PaginationDto, WithCountDto } from "type-defs";

import type { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private entityManager: EntityManager
  ) {}

  create(data: DeepPartial<Job>) {
    return this.jobRepository.save(data);
  }

  async findByAccountId(
    accountId: number,
    opts?: PaginationDto
  ): Promise<WithCountDto<Job>> {
    const accountJobs = await this.jobRepository.find({
      where: { account: { id: accountId } },
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: { updatedAt: "DESC" },
      relations: ["client", "preferences", "rooms"],
    });

    return { count: accountJobs.length, data: accountJobs };
  }

  findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ["client", "preferences"],
    });

    return job;
  }

  async update(id: number, data: UpdateJobDto) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new HttpException("Job not found", 404);
    }

    const mergedJob = mergeWith(job, data, (_, srcValue) => {
      if (srcValue?.id) {
        return { id: srcValue.id };
      }
    });

    return this.jobRepository.save(mergedJob);
  }

  async updateTerms(id: number, termsId: number) {
    const job = await this.jobRepository.findOneBy({ id });

    if (!job) {
      throw new HttpException("Job not found", 404);
    }

    const preferences = job.preferences;
    const mergedPreferences = merge(preferences, { terms: { id: termsId } });
    return this.entityManager.save(mergedPreferences);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
}
