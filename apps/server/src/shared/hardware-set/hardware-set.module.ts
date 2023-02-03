import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HardwareSet } from "database/entities";

import { HardwareSetController } from "./hardware-set.controller";
import { HardwareSetService } from "./hardware-set.service";

@Module({
  imports: [TypeOrmModule.forFeature([HardwareSet])],
  controllers: [HardwareSetController],
  providers: [HardwareSetService],
})
export class HardwareSetModule {}
