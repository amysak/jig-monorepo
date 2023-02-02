import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CabinetOpening } from "database/entities";

import { CabinetEquipmentController } from "./cabinet-equipment.controller";
import { CabinetEquipmentService } from "./cabinet-equipment.service";

@Module({
  imports: [TypeOrmModule.forFeature([CabinetOpening])],
  controllers: [CabinetEquipmentController],
  providers: [CabinetEquipmentService],
})
export class CabinetOpeningModule {}
