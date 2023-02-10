import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vendor } from "database/entities";

import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
