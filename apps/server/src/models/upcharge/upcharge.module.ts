import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Upcharge } from "database/entities";
import { UpchargeController } from "./upcharge.controller";
import { UpchargeService } from "./upcharge.service";

@Module({
  imports: [TypeOrmModule.forFeature([Upcharge])],
  controllers: [UpchargeController],
  providers: [UpchargeService],
})
export class UpchargeModule {}
