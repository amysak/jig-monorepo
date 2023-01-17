import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsIn, IsObject, IsOptional } from "class-validator";

import { COMPLETION_STATUS, type CompletionStatus } from "type-defs";
import { JobNotes, JobPreferences } from "database/entities";
import { CreateJobDto } from "./create-job.dto";

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsOptional()
  @IsObject()
  @ApiProperty()
  preferences?: JobPreferences;

  @IsOptional()
  @IsIn(Object.values(COMPLETION_STATUS))
  @ApiProperty()
  status?: CompletionStatus;

  @IsOptional()
  @ApiProperty()
  notes?: JobNotes;
}
