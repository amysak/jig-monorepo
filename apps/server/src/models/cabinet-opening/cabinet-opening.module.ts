import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CabinetOpening } from "database/entities";

import { CabinetOpeningController } from "./cabinet-opening.controller";
import { CabinetOpeningService } from "./cabinet-opening.service";

@Module({
  imports: [TypeOrmModule.forFeature([CabinetOpening])],
  controllers: [CabinetOpeningController],
  providers: [CabinetOpeningService],
})
export class CabinetOpeningModule {}
