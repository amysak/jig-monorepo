import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FinishProcess, Paint } from "database/entities";
import * as controllers from "./controllers";
import * as providers from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([FinishProcess, Paint])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class FinishModule {}
