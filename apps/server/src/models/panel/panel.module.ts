import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Panel } from "database/entities";

import { PanelController } from "./panel.controller";
import { PanelService } from "./panel.service";

@Module({
  imports: [TypeOrmModule.forFeature([Panel])],
  controllers: [PanelController],
  providers: [PanelService],
})
export class PanelModule {}
