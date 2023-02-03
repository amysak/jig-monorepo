import { IsOptional, IsString } from "class-validator";

import { MaterialPurpose } from "../enums";

export class MaterialFiltersDto {
  @IsOptional()
  @IsString()
  purpose?: MaterialPurpose;

  @IsOptional()
  @IsString()
  type?: string;
}
