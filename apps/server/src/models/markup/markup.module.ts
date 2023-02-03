import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Markup } from "database/entities";
import { MarkupController } from "./markup.controller";
import { MarkupService } from "./markup.service";

@Module({
  imports: [TypeOrmModule.forFeature([Markup])],
  controllers: [MarkupController],
  providers: [MarkupService],
})
export class MarkupModule {}
