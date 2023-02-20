import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Material, Model, Vendor } from "database/entities";
import * as controllers from "./controllers";
import * as providers from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([Material, Vendor, Model])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class MaterialModule {}
