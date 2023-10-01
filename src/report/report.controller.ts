import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RevenueService } from 'src/revenue/revenue.service';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(private revenueService: RevenueService) {}

  @Get('total-revenue')
  async getTotalRevenue() {
    return this.revenueService.getTotalRevenue();
  }
}
