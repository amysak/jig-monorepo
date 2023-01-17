import { Module } from '@nestjs/common';
import { FinishService } from './finish.service';
import { FinishController } from './finish.controller';

@Module({
  controllers: [FinishController],
  providers: [FinishService]
})
export class FinishModule {}
