import { Transform } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

import { DEFAULT_PAGE_SIZE } from "../constants";

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    parseInt(value) ? parseInt(value) : DEFAULT_PAGE_SIZE
  )
  limit = DEFAULT_PAGE_SIZE;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (parseInt(value) ? parseInt(value) : 1))
  page = 1;

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
