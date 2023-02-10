import { IsArray, IsNumber } from "class-validator";
import type { Room } from "database/entities";

export class GetRoomsByAccountDto {
  @IsNumber()
  count!: number;

  @IsArray()
  rooms!: Room[];
}
