import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LotDto } from './dto/lot.dto';

@Injectable()
export class ParkingLotService {
  constructor(private prisma: PrismaService) {}

  async createParkingLot(LotDto: LotDto) {
    const lot = await this.prisma.parkingLot.create({
      data: LotDto,
    });

    return lot;
  }

  async deleteParkingLot(id: number) {
    const lot = await this.prisma.parkingLot.findUnique({
      where: { id },
      include: {
        slots: true,
      },
    });

    if (!lot) {
      throw new NotFoundException(`Lot with id ${id} not found`);
    }

    //DOCU: Delete all slots in the lot.
    for (const slot of lot.slots) {
      await this.prisma.slot.delete({
        where: { id: slot.id },
      });
    }

    //DOCU: Delete the lot.
    await this.prisma.parkingLot.delete({
      where: { id },
    });

    return 'Lot deleted successfully';
  }
}
