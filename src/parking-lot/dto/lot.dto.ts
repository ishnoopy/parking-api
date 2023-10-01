import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LotDto {
  @ApiProperty({
    example: 'Park and Ride',
    description: 'The name of the parking lot',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  totalCapacity: number;

  @ApiProperty({
    example: 50,
  })
  @IsNumber()
  ratePerHour: number;
}
