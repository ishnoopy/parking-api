import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RevenueDto {
  @ApiProperty({
    example: 560.1,
  })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  parkingLotId: number;
}
