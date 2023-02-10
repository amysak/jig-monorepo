import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaterialSet } from "database/entities";

import { MaterialSetController } from "./material-set.controller";
import { MaterialSetService } from "./material-set.service";

@Module({
  imports: [TypeOrmModule.forFeature([MaterialSet])],
  controllers: [MaterialSetController],
  providers: [MaterialSetService],
  exports: [MaterialSetService],
})
export class MaterialSetModule {}
