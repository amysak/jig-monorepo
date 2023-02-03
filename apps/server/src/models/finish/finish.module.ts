import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Finish } from "database/entities";

import { FinishController } from "./finish.controller";
import { FinishService } from "./finish.service";

@Module({
  imports: [TypeOrmModule.forFeature([Finish])],
  controllers: [FinishController],
  providers: [FinishService],
})
export class FinishModule {}
