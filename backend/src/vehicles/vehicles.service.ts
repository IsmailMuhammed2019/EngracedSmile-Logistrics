import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle, VehicleStatus } from './entities/vehicle.entity';
import { Route } from './entities/route.entity';
import { Driver } from './entities/driver.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  // Vehicle CRUD operations
  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create(createVehicleDto);
    return await this.vehiclesRepository.save(vehicle);
  }

  async findAllVehicles(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({
      relations: ['driver', 'routes'],
    });
  }

  async findVehicleById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id },
      relations: ['driver', 'routes'],
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async findAvailableVehicles(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({
      where: { 
        isAvailable: true,
        status: VehicleStatus.ACTIVE,
      },
      relations: ['driver', 'routes'],
    });
  }

  async updateVehicle(id: string, updateData: Partial<CreateVehicleDto>): Promise<Vehicle> {
    const vehicle = await this.findVehicleById(id);
    Object.assign(vehicle, updateData);
    return await this.vehiclesRepository.save(vehicle);
  }

  async deleteVehicle(id: string): Promise<void> {
    const vehicle = await this.findVehicleById(id);
    await this.vehiclesRepository.remove(vehicle);
  }

  // Route CRUD operations
  async createRoute(createRouteDto: CreateRouteDto): Promise<Route> {
    const vehicle = await this.findVehicleById(createRouteDto.vehicleId);
    const route = this.routesRepository.create(createRouteDto);
    route.vehicle = vehicle;
    return await this.routesRepository.save(route);
  }

  async findAllRoutes(): Promise<Route[]> {
    return await this.routesRepository.find({
      relations: ['vehicle', 'vehicle.driver'],
    });
  }

  async findRouteById(id: string): Promise<Route> {
    const route = await this.routesRepository.findOne({
      where: { id },
      relations: ['vehicle', 'vehicle.driver'],
    });

    if (!route) {
      throw new NotFoundException('Route not found');
    }

    return route;
  }

  async findRoutesByCities(departureCity: string, arrivalCity: string): Promise<Route[]> {
    return await this.routesRepository.find({
      where: {
        departureCity,
        arrivalCity,
        isAvailable: true,
      },
      relations: ['vehicle', 'vehicle.driver'],
    });
  }

  async updateRoute(id: string, updateData: Partial<CreateRouteDto>): Promise<Route> {
    const route = await this.findRouteById(id);
    Object.assign(route, updateData);
    return await this.routesRepository.save(route);
  }

  async deleteRoute(id: string): Promise<void> {
    const route = await this.findRouteById(id);
    await this.routesRepository.remove(route);
  }

  // Driver CRUD operations
  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driversRepository.create(createDriverDto);
    return await this.driversRepository.save(driver);
  }

  async findAllDrivers(): Promise<Driver[]> {
    return await this.driversRepository.find({
      relations: ['vehicles'],
    });
  }

  async findDriverById(id: string): Promise<Driver> {
    const driver = await this.driversRepository.findOne({
      where: { id },
      relations: ['vehicles'],
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  async updateDriver(id: string, updateData: Partial<CreateDriverDto>): Promise<Driver> {
    const driver = await this.findDriverById(id);
    Object.assign(driver, updateData);
    return await this.driversRepository.save(driver);
  }

  async deleteDriver(id: string): Promise<void> {
    const driver = await this.findDriverById(id);
    await this.driversRepository.remove(driver);
  }

  // Statistics
  async getVehicleStats() {
    const totalVehicles = await this.vehiclesRepository.count();
    const activeVehicles = await this.vehiclesRepository.count({
      where: { status: VehicleStatus.ACTIVE },
    });
    const totalRoutes = await this.routesRepository.count();
    const totalDrivers = await this.driversRepository.count();

    return {
      totalVehicles,
      activeVehicles,
      totalRoutes,
      totalDrivers,
    };
  }
}
