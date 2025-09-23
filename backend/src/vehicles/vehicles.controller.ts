import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // Vehicle endpoints
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get()
  findAllVehicles() {
    return this.vehiclesService.findAllVehicles();
  }

  @Get('available')
  findAvailableVehicles() {
    return this.vehiclesService.findAvailableVehicles();
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  getVehicleStats() {
    return this.vehiclesService.getVehicleStats();
  }

  @Get(':id')
  findVehicleById(@Param('id') id: string) {
    return this.vehiclesService.findVehicleById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  updateVehicle(@Param('id') id: string, @Body() updateData: Partial<CreateVehicleDto>) {
    return this.vehiclesService.updateVehicle(id, updateData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.deleteVehicle(id);
  }

  // Route endpoints
  @Post('routes')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  createRoute(@Body() createRouteDto: CreateRouteDto) {
    return this.vehiclesService.createRoute(createRouteDto);
  }

  @Get('routes')
  findAllRoutes() {
    return this.vehiclesService.findAllRoutes();
  }

  @Get('routes/search')
  findRoutesByCities(
    @Query('from') departureCity: string,
    @Query('to') arrivalCity: string,
  ) {
    return this.vehiclesService.findRoutesByCities(departureCity, arrivalCity);
  }

  @Get('routes/:id')
  findRouteById(@Param('id') id: string) {
    return this.vehiclesService.findRouteById(id);
  }

  @Patch('routes/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  updateRoute(@Param('id') id: string, @Body() updateData: Partial<CreateRouteDto>) {
    return this.vehiclesService.updateRoute(id, updateData);
  }

  @Delete('routes/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  deleteRoute(@Param('id') id: string) {
    return this.vehiclesService.deleteRoute(id);
  }

  // Driver endpoints
  @Post('drivers')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  createDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.vehiclesService.createDriver(createDriverDto);
  }

  @Get('drivers')
  findAllDrivers() {
    return this.vehiclesService.findAllDrivers();
  }

  @Get('drivers/:id')
  findDriverById(@Param('id') id: string) {
    return this.vehiclesService.findDriverById(id);
  }

  @Patch('drivers/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  updateDriver(@Param('id') id: string, @Body() updateData: Partial<CreateDriverDto>) {
    return this.vehiclesService.updateDriver(id, updateData);
  }

  @Delete('drivers/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  deleteDriver(@Param('id') id: string) {
    return this.vehiclesService.deleteDriver(id);
  }
}
