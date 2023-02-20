import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import mergeWith from "lodash.mergewith";
import { DeepPartial, EntityManager, Repository } from "typeorm";

import { Job, Terms } from "database/entities";
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

  async findByUserId(
    userId: number,
    opts?: PaginationDto
  ): Promise<WithCountDto<Job>> {
    const userJobs = await this.jobRepository.find({
      where: { user: { id: userId } },
      skip: (opts.page - 1) * opts.limit || void 0,
      take: opts.limit,
      order: { updatedAt: "DESC" },
      relations: ["client", "rooms"],
    });

    return { count: userJobs.length, data: userJobs };
  }

  findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ["client"],
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

    job.terms = Object.assign(new Terms(), { id: termsId });
    return job.save();
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
}
