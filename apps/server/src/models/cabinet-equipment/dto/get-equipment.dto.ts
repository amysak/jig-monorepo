import { IntersectionType } from "@nestjs/swagger";
import { EquipmentFiltersDto, PaginationDto } from "type-defs";

export class GetEquipmentDto extends IntersectionType(
  EquipmentFiltersDto,
  PaginationDto
) {}
