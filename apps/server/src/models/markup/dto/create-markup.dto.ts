import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMarkupDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  description!: string;

  @IsString()
  @ApiProperty()
  markup!: number;
}
