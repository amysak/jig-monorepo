import { Module } from "@nestjs/common";

import { CabinetOpeningController } from "./cabinet-opening.controller";
import { CabinetOpeningService } from "./cabinet-opening.service";

@Module({
  controllers: [CabinetOpeningController],
  providers: [CabinetOpeningService],
})
export class CabinetOpeningModule {}
