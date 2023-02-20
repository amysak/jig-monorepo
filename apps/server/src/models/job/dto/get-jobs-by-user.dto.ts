import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";

import type { Job } from "database/entities";

export class GetJobsByUserInputDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  limit?: number = 0;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  skip?: number = 0;
}

export class GetJobsByUserDto {
  @IsNumber()
  count!: number;

  @IsArray()
  jobs!: Job[];
}
