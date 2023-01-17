import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "auth/guards";
import { ReqUser } from "common/decorators";
import type { Payload } from "type-defs";

import {
  CreateJobDto,
  GetJobsByAccountDto,
  GetJobsByAccountInputDto,
} from "./dto";
import { JobService } from "./job.service";

@UseGuards(JwtAuthGuard)
@Controller("jobs")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@ReqUser() user: Payload, @Body() data: CreateJobDto) {
    return this.jobService.create({ ...data, account: { id: user.accountId } });
  }

  @Get()
  async getAccountJobs(
    @ReqUser() user: Payload,
    @Query() query: GetJobsByAccountInputDto
  ): Promise<GetJobsByAccountDto> {
    return this.jobService.findByAccountId(user.accountId, query);
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.jobService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() data: any) {
    return this.jobService.update(id, data);
  }

  @Patch(":id/terms/:termsId")
  async updateTerms(@Param() { id, termsId }: { id: number; termsId: number }) {
    return this.jobService.updateTerms(id, termsId);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.jobService.remove(id);
  }
}
