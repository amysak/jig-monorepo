import { IntersectionType } from "@nestjs/swagger";
import { MaterialFiltersDto, PaginationDto } from "type-defs";

export class GetMaterialsDto extends IntersectionType(
  MaterialFiltersDto,
  PaginationDto
) {}
