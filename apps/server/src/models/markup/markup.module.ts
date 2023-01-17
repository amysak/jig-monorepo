import { Module } from '@nestjs/common';
import { MarkupService } from './markup.service';
import { MarkupController } from './markup.controller';

@Module({
  controllers: [MarkupController],
  providers: [MarkupService]
})
export class MarkupModule {}
