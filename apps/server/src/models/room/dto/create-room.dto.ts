import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

import { RoomElevation, ROOM_ELEVATION } from "type-defs";

export class CreateRoomDto {
  @IsInt()
  @ApiProperty()
  jobId: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsIn(Object.values(ROOM_ELEVATION))
  @IsOptional()
  @ApiProperty()
  elevation?: RoomElevation;
}
