import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AvailSlotDto, CreateSlotDto } from './dto';
import { SlotService } from './slot.service';
import { DecimalPlacesPipe } from 'src/common/pipes/decimal-places.pipe';

@Controller('slot')
@ApiTags('slot')
export class SlotController {
  constructor(private slotService: SlotService) {}

  @Post('create')
  createSlot(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.createSlot(createSlotDto);
  }

  @Get('search-by-id')
  @ApiQuery({ name: 'id', required: true, type: Number })
  searchSlot(@Query('id', ParseIntPipe) id: number) {
    return this.slotService.searchSlotById(id);
  }

  @Get('search-by-ticket-number')
  @ApiQuery({ name: 'ticketNumber', required: true, type: String })
  searchSlotByTicketNumber(@Query('ticketNumber') ticketNumber: string) {
    return this.slotService.searchSlotByTicketNumber(ticketNumber);
  }

  @Post('avail-slot')
  availSlot(@Body() availSlotDto: AvailSlotDto) {
    return this.slotService.availSlot(availSlotDto);
  }

  @Get('out-slot')
  @ApiQuery({ name: 'ticketNumber', required: true, type: String })
  async outSlot(@Query('ticketNumber') ticketNumber: string) {
    const slot = await this.slotService.searchSlotByTicketNumber(ticketNumber);
    const feeDetails = await this.calculateFee(ticketNumber);
    await this.slotService.unavailSlot(slot.id);

    return {
      Message: 'Thank you for parking with us',
      ...feeDetails,
    };
  }

  @Get('calculate-fee')
  @ApiQuery({ name: 'ticketNumber', required: true, type: String })
  async calculateFee(@Query('ticketNumber') ticketNumber: string) {
    const slot = await this.slotService.searchSlotByTicketNumber(ticketNumber);

    const timeIn = slot.timeIn;
    const timeOut = new Date();

    const diff = Math.abs(timeOut.getTime() - timeIn.getTime());
    const hours = diff / (1000 * 60 * 60); // Convert milliseconds to hours

    const ratePerHour = slot.parkingLot.ratePerHour;

    const totalFee = hours * ratePerHour;

    return {
      totalFee: new DecimalPlacesPipe(2).transform(totalFee),
      hours: new DecimalPlacesPipe(2).transform(hours),
      ratePerHour: ratePerHour,
      parkingLot: slot.parkingLot.name,
      lotNumber: slot.number,
      ticketNumber: slot.ticketNumber,
    };
  }
}
