import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @IsNumber()
  @ApiProperty()
  clientId!: number;

  @IsString()
  @ApiProperty()
  name!: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  estimateDate!: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  proposalDate!: Date;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  subdivision?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => (value ? parseInt(value) : 0))
  lotNumber?: number;
}
