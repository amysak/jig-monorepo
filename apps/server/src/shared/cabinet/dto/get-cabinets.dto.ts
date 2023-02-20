import { IntersectionType } from "@nestjs/swagger";

import { CabinetFiltersDto, PaginationDto } from "type-defs";

export class GetCabinetsDto extends IntersectionType(
  CabinetFiltersDto,
  PaginationDto
) {}
