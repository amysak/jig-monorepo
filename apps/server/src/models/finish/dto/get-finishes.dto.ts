import { IntersectionType } from "@nestjs/swagger";
import { PaintFiltersDto, PaginationDto } from "type-defs";

export class GetPaintsDto extends IntersectionType(
  PaintFiltersDto,
  PaginationDto
) {}
