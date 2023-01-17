import { IsOptional, IsString } from "class-validator";

import type { MailingAddress } from "database/entities";

export class CreateClientDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  salutation!: "Mr." | "Mrs.";

  @IsString()
  @IsOptional()
  email?: string;

  @IsOptional()
  mailingAddress?: MailingAddress;

  @IsOptional()
  physicalAddress?: MailingAddress;
}
