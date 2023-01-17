import { Module } from '@nestjs/common';
import { HardwareSetService } from './hardware-set.service';
import { HardwareSetController } from './hardware-set.controller';

@Module({
  controllers: [HardwareSetController],
  providers: [HardwareSetService]
})
export class HardwareSetModule {}
