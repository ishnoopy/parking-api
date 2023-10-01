import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RevenueDto } from './dto';
import { DecimalPlacesPipe } from 'src/common/pipes/decimal-places.pipe';

@Injectable()
export class RevenueService {
  constructor(private prisma: PrismaService) {}

  async getTotalRevenue() {
    const totalRevenue = await this.prisma.revenue.aggregate({
      _sum: {
        amount: true,
      },
    });

    return {
      totalRevenue: new DecimalPlacesPipe(2).transform(
        totalRevenue._sum.amount,
      ),
    };
  }

  async addRevenue(revenueDto: RevenueDto) {
    return this.prisma.revenue.create({
      data: revenueDto,
    });
  }
}
