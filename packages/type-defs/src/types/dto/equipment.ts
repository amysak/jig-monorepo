import { IsOptional, IsString } from "class-validator";

import { CabinetEquipmentCategory } from "../enums";

export class EquipmentFiltersDto {
  @IsOptional()
  @IsString()
  category?: CabinetEquipmentCategory;
}
