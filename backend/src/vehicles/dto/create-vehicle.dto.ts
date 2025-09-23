import { IsString, IsNumber, IsEnum, IsArray, IsOptional, IsBoolean, Min, Max } from 'class-validator';
import { VehicleType, VehicleStatus } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(VehicleType)
  type: VehicleType;

  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;

  @IsNumber()
  @Min(1)
  @Max(20)
  capacity: number;

  @IsNumber()
  @Min(0)
  pricePerTrip: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  plateNumber?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  specifications?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  driverId?: string;
}
