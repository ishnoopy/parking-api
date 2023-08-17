import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'aldringuasa@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    minLength: 5,
    example: '12345',
  })
  @IsNotEmpty()
  @Length(5, 255) // You can adjust the minimum and maximum password length
  password: string;

  @ApiProperty({
    example: 'Ruel Aldrin',
    description: 'User first name',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Guasa',
    description: 'User last name',
  })
  @IsNotEmpty()
  lastName: string;
}
