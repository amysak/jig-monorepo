import { IntersectionType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

import { CabinetFiltersDto } from "type-defs";

export class CreateCabinetDto {
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateCabinetDto extends PartialType(CreateCabinetDto) {
  @IsOptional()
  @IsBoolean()
  favourite?: boolean;

  // @IsOptional()
  // @IsBoolean()
  // isActive?: boolean;
}
