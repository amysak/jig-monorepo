import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CabinetEquipment } from "database/entities";

import { CabinetEquipmentController } from "./cabinet-equipment.controller";
import { CabinetEquipmentService } from "./cabinet-equipment.service";

@Module({
  imports: [TypeOrmModule.forFeature([CabinetEquipment])],
  controllers: [CabinetEquipmentController],
  providers: [CabinetEquipmentService],
})
export class CabinetEquipmentModule {}
