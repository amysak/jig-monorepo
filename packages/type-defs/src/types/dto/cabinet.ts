import { Transform } from "class-transformer";
import { IsArray, IsOptional } from "class-validator";

import { CabinetType } from "../enums";
import { PaginationDto } from "./common";

export class CabinetFiltersDto extends PaginationDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    console.log("value => ", value);
    return value?.split(",");
  })
  type?: CabinetType[];
}
