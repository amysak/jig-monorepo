import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || undefined)
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || undefined)
  page?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;
}

export type Pagination = Partial<PaginationDto>;

export class WithCountDto<T> {
  @IsNumber()
  count: number;

  @IsArray()
  data: T[];
}

export class ApiGetResult<T> {
  @IsArray()
  data: T[];
}
