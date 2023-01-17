import { Module } from '@nestjs/common';
import { TrimMoldingService } from './trim-molding.service';
import { TrimMoldingController } from './trim-molding.controller';

@Module({
  controllers: [TrimMoldingController],
  providers: [TrimMoldingService]
})
export class TrimMoldingModule {}
