import { IsOptional, IsString } from "class-validator";

import { CabinetOpeningType } from "../enums";

export class OpeningFiltersDto {
  @IsOptional()
  @IsString()
  category?: CabinetOpeningType;
}
