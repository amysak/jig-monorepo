import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class PaintFiltersDto {
  @IsOptional()
  @IsString()
  type?: string;
}
