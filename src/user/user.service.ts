import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string) {
    const saltOrRounds = 5;
    return bcrypt.hash(password, saltOrRounds);
  }

  async create(signUpDto: SignUpDto) {
    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    return this.prisma.user.create({
      data: signUpDto,
    });
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
