import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { RevenueService } from 'src/revenue/revenue.service';

@Module({
  controllers: [SlotController],
  providers: [SlotService, RevenueService],
  exports: [SlotService],
})
export class SlotModule {}
