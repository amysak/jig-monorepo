import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FinishFiltersDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true")
  group?: boolean;

  @IsOptional()
  @IsString()
  type?: string;
}
