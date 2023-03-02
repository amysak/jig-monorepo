import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateRoomDto {
  @IsInt()
  @ApiProperty()
  jobId: number;

  @IsString()
  @ApiProperty()
  name: string;
}
