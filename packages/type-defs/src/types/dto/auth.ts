import { IsString } from "class-validator";

export class AccountLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
