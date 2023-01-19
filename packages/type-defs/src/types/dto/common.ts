import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  limit?: number;

  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  page!: number;
}

export class WithCountDto<T> {
  @IsNumber()
  count: number;

  @IsArray()
  data: T[];
}
