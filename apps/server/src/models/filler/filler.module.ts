import { Module } from "@nestjs/common";
import { FillerService } from "./filler.service";
import { FillerController } from "./filler.controller";

@Module({
  controllers: [FillerController],
  providers: [FillerService],
})
export class FillerModule {}
