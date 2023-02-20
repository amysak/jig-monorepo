import { IsOptional } from "class-validator";
import { Terms } from "database/entities";

export class CreateTermsDto {
  @IsOptional()
  name!: string;

  @IsOptional()
  description!: string;

  @IsOptional()
  payments!: Terms["payments"];
}
