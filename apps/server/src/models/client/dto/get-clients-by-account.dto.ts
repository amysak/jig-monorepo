import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";

import type { Client } from "database/entities";

export class GetClientsByAccountInputDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  skip?: number;
}

export class GetClientsByAccountDto {
  @IsNumber()
  count!: number;

  @IsArray()
  clients!: Client[];
}
