import { IsIn, IsInt, IsString } from "class-validator";

import { RoomElevation, ROOM_ELEVATION } from "type-defs";

export class CreateRoomDto {
  @IsInt()
  jobId!: number;

  @IsString()
  name!: string;

  @IsIn(Object.values(ROOM_ELEVATION))
  elevation?: RoomElevation;
}
