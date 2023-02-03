import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToePlatform } from "database/entities";

import { ToeController } from "./toe.controller";
import { ToeService } from "./toe.service";

@Module({
  imports: [TypeOrmModule.forFeature([ToePlatform])],
  controllers: [ToeController],
  providers: [ToeService],
})
export class ToeModule {}
