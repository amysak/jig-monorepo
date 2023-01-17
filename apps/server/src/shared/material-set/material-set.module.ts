import { Module } from '@nestjs/common';
import { MaterialSetService } from './material-set.service';
import { MaterialSetController } from './material-set.controller';

@Module({
  controllers: [MaterialSetController],
  providers: [MaterialSetService]
})
export class MaterialSetModule {}
