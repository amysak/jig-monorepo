import { IsOptional, IsString } from "class-validator";

import { ProfileType } from "../enums";

export class ProfileFiltersDto {
  @IsOptional()
  @IsString()
  type?: ProfileType;
}
