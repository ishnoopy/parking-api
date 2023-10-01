import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { RevenueService } from 'src/revenue/revenue.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, RevenueService],
})
export class ReportModule {}
