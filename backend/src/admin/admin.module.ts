import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [UsersModule, BookingsModule],
  controllers: [AdminController],
})
export class AdminModule {}
