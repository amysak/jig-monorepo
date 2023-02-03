import { IntersectionType } from "@nestjs/swagger";
import { FinishFiltersDto, PaginationDto } from "type-defs";

export class GetFinishesDto extends IntersectionType(
  FinishFiltersDto,
  PaginationDto
) {}
