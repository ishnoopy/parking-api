import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() signUpDto: SignUpDto) {
    return this.userService.create(signUpDto);
  }
}
