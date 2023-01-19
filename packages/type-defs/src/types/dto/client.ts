import { IsOptional, IsString } from "class-validator";

import { Address } from "../models";

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  salutation: "Mr." | "Mrs." | "Miss" | "Dr.";

  @IsString()
  @IsOptional()
  email?: string;

  @IsOptional()
  mailingAddress?: Address;

  @IsOptional()
  physicalAddress?: Address;
}

export class UpdateClientDto {}
