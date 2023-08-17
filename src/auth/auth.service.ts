import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOne(signInDto.email);

    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
