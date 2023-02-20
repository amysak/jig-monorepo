import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { COMPLETION_STATUS, type CompletionStatus } from "type-defs";

import { JobNotes } from "database/entities";
import { CreateJobDto } from "./create-job.dto";

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsOptional()
  @IsIn(Object.values(COMPLETION_STATUS))
  @ApiProperty()
  status?: CompletionStatus;

  @IsOptional()
  @ApiProperty()
  notes?: JobNotes;
}
