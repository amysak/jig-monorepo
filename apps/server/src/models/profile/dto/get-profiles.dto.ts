import { IntersectionType } from "@nestjs/swagger";
import { ProfileFiltersDto, PaginationDto } from "type-defs";

export class GetProfilesDto extends IntersectionType(
  ProfileFiltersDto,
  PaginationDto
) {}
