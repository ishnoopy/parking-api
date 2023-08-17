import { Module } from '@nestjs/common';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { PrismaModule } from './prisma/prisma.module';
import { SlotModule } from './slot/slot.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ParkingLotModule, PrismaModule, SlotModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
