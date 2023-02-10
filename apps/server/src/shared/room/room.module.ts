import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  Cabinet,
  CabinetSpecifications,
  HardwareSet,
  MaterialSet,
  Room,
} from "database/entities";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Cabinet,
      CabinetSpecifications,
      MaterialSet,
      HardwareSet,
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
