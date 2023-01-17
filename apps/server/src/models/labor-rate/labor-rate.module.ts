import { Module } from '@nestjs/common';
import { LaborRateService } from './labor-rate.service';
import { LaborRateController } from './labor-rate.controller';

@Module({
  controllers: [LaborRateController],
  providers: [LaborRateService]
})
export class LaborRateModule {}
