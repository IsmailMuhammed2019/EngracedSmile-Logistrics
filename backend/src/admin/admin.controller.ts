import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { BookingsService } from '../bookings/bookings.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Get('dashboard')
  async getDashboard(@Request() req) {
    const userStats = await this.usersService.getStats();
    const bookingStats = await this.bookingsService.getStats();
    
    return {
      user: userStats,
      bookings: bookingStats,
      admin: {
        name: req.user.firstName + ' ' + req.user.lastName,
        role: req.user.role,
      },
    };
  }

  @Get('users')
  @Roles(UserRole.ADMIN)
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('bookings')
  getBookings() {
    return this.bookingsService.findAll();
  }

  @Get('bookings/stats')
  getBookingStats() {
    return this.bookingsService.getStats();
  }
}
