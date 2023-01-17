import { IsOptional } from "class-validator";
import type { MultiPaymentTerms } from "database/entities";

export class CreateTermsDto {
  @IsOptional()
  name!: string;

  @IsOptional()
  description!: string;

  @IsOptional()
  payments!: MultiPaymentTerms["payments"];
}
