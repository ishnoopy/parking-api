import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateSlotDto {
  @ApiProperty({
    description: 'ID of the associated parking lot',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  parkingLotId: number;

  @ApiProperty({
    description: 'Slot number',
    example: 'A101',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'Status of the slot',
    example: 'available',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Ticket number for the slot',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  ticketNumber: string;

  @ApiProperty({
    description: 'Time the slot was occupied',
    example: '2023-08-15T10:30:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  timeIn: Date;
}

export class UpdateStatusSlotDto {
  @ApiProperty({
    description: 'Slot number',
    example: 'A101',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'New status of the slot',
    example: 'occupied',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Date and time of the update',
    example: '2023-08-15T15:45:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class UpdateTicketNumberSlotDto {
  @ApiProperty({
    description: 'Slot number',
    example: 'A101',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'New ticket number for the slot',
    example: 67890,
  })
  @IsNumber()
  @IsNotEmpty()
  ticketNumber: number;

  @ApiProperty({
    description: 'Date and time of the update',
    example: '2023-08-15T16:30:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class AvailSlotDto {
  @ApiProperty({
    description: 'The slot Id',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'The status of the slot',
    example: 'occupied',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The ticket number associated with the slot',
    example: 'T12345',
  })
  @IsString()
  ticketNumber: string;

  @ApiProperty({
    description: 'The time the vehicle entered the slot',
    example: '2023-08-14T12:30:00Z',
  })
  @IsDate()
  timeIn: Date;

  @ApiProperty({
    description: 'The last update time of the slot',
    example: '2023-08-14T14:45:00Z',
  })
  @IsDate()
  updatedAt: Date;
}
