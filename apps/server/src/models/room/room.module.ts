import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  Cabinet,
  FinishProcess,
  HardwareSet,
  Material,
  MaterialSet,
  Model,
  Paint,
  Room,
} from "database/entities";
import { CabinetModule } from "shared";
import { RoomController } from "./room.controller";
import { RoomService } from "./room.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Cabinet,
      Material,
      Model,
      FinishProcess,
      Paint,
      MaterialSet,
      HardwareSet,
    ]),
    CabinetModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
