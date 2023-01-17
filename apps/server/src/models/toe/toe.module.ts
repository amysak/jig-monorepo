import { Module } from '@nestjs/common';
import { ToeService } from './toe.service';
import { ToeController } from './toe.controller';

@Module({
  controllers: [ToeController],
  providers: [ToeService]
})
export class ToeModule {}
