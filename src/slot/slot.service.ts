import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailSlotDto, CreateSlotDto } from './dto';

@Injectable()
export class SlotService {
  constructor(private prisma: PrismaService) {}

  async createSlot(createSlotDto: CreateSlotDto) {
    //DOCU: Increment the total capacity of the parking lot by 1.
    await this.prisma.parkingLot.update({
      where: {
        id: createSlotDto.parkingLotId,
      },
      data: {
        totalCapacity: {
          increment: 1,
        },
      },
    });

    return this.prisma.slot.create({
      data: createSlotDto,
    });
  }

  async searchSlotById(id: number) {
    return this.prisma.slot.findUnique({
      where: {
        id: id,
      },
    });
  }

  async searchSlotByTicketNumber(ticketNumber: string) {
    return this.prisma.slot.findUnique({
      where: {
        ticketNumber: ticketNumber,
      },
      include: {
        parkingLot: true,
      },
    });
  }

  async availSlot(availSlotDto: AvailSlotDto) {
    return this.prisma.slot.update({
      where: {
        id: availSlotDto.id,
      },
      data: {
        status: 'occupied',
        ticketNumber: availSlotDto.ticketNumber,
        timeIn: availSlotDto.timeIn,
      },
    });
  }

  async unavailSlot(id: number) {
    return this.prisma.slot.update({
      where: {
        id: id,
      },
      data: {
        status: 'available',
        ticketNumber: null,
        timeIn: null,
      },
    });
  }
}
