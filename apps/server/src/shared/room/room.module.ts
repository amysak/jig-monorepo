import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Cabinet, HardwareSet, MaterialSet, Room } from "database/entities";
import { CabinetModule } from "shared/cabinet";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Cabinet, MaterialSet, HardwareSet]),
    CabinetModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
