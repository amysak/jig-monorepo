import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Cabinet } from "database/entities";
import { CabinetController } from "./cabinet.controller";
import { CabinetService } from "./cabinet.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cabinet])],
  controllers: [CabinetController],
  providers: [CabinetService],
})
export class CabinetModule {}
