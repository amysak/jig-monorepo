import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Markup, Terms, Upcharge } from "database/entities";
import * as controllers from "./controllers";
import * as providers from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([Markup, Terms, Upcharge])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class PricesModule {}
