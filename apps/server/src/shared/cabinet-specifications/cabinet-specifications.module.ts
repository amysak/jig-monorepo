import { Module } from "@nestjs/common";

import { CabinetSpecificationsService } from "./cabinet-specifications.service";

@Module({
  providers: [CabinetSpecificationsService],
})
export class CabinetSpecificationsModule {}
