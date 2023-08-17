import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LotDto } from './dto/lot.dto';
import { SlotService } from 'src/slot/slot.service';

@Controller('lot')
@ApiTags('lot')
export class ParkingLotController {
  constructor(
    private parkingLotService: ParkingLotService,
    private slotService: SlotService,
  ) {}

  @Post('create')
  async createLot(@Body() lotDto: LotDto) {
    try {
      const lot = await this.parkingLotService.createParkingLot(lotDto);

      const totalCapacity = lotDto.totalCapacity;
      for (let i = 1; i <= totalCapacity; i++) {
        const number = `${lot.name.substring(0, 3).toUpperCase()}${i}`;
        await this.slotService.createSlot({
          parkingLotId: lot.id,
          number: number,
          status: 'available',
          ticketNumber: null,
          timeIn: null,
        });
      }

      return lotDto;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Get('delete')
  @ApiQuery({ name: 'id', required: true, type: Number })
  async deleteLot(@Query('id', ParseIntPipe) id: number) {
    try {
      return await this.parkingLotService.deleteParkingLot(id);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
