import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsIn, IsObject, IsOptional } from "class-validator";
import { CompletionStatus, COMPLETION_STATUS, MaterialSet } from "type-defs";
import { CreateRoomDto } from "./create-room.dto";

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsOptional()
  @IsObject()
  @ApiProperty()
  materialSet?: MaterialSet;

  @IsOptional()
  @IsIn(Object.values(COMPLETION_STATUS))
  @ApiProperty()
  status?: CompletionStatus;
}
