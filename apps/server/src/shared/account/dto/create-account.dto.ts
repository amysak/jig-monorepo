import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  // @Transform(({ value }) => ({company: { name: value}}))
  companyName!: string;
}
