import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Filler } from "database/entities";
import { FillerController } from "./filler.controller";
import { FillerService } from "./filler.service";

@Module({
  imports: [TypeOrmModule.forFeature([Filler])],
  controllers: [FillerController],
  providers: [FillerService],
})
export class FillerModule {}
