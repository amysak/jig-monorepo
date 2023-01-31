import { IsOptional, IsString } from "class-validator";

import { CabinetType } from "../enums";

export class CabinetFiltersDto {
  @IsOptional()
  @IsString()
  type?: CabinetType;
}
