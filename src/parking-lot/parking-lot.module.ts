import { Module } from '@nestjs/common';
import { ParkingLotController } from './parking-lot.controller';
import { ParkingLotService } from './parking-lot.service';
import { SlotService } from 'src/slot/slot.service';

@Module({
  controllers: [ParkingLotController],
  providers: [ParkingLotService, SlotService],
})
export class ParkingLotModule {}
