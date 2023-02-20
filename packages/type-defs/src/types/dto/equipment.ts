import { IsOptional, IsString } from "class-validator";

import { EquipmentCategory } from "../enums";

export class EquipmentFiltersDto {
  @IsOptional()
  @IsString()
  category?: EquipmentCategory;
}
