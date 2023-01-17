import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Preferences } from "database/entities";
import { PreferencesService } from "./preferences.service";

@Module({
  imports: [TypeOrmModule.forFeature([Preferences])],
  providers: [PreferencesService],
})
export class PreferencesModule {}
