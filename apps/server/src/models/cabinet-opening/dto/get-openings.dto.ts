import { IntersectionType } from "@nestjs/swagger";
import { OpeningFiltersDto, PaginationDto } from "type-defs";

export class GetOpeningsDto extends IntersectionType(
  OpeningFiltersDto,
  PaginationDto
) {}
