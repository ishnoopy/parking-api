import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { AuthGuard } from './guard/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from './guard/role.guard';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth() //DOCU: Adding the @ApiBearerAuth() decorator to the controller will apply bearer token security to all endpoints.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
