import { IsString, IsNumber, IsEnum, IsArray, IsOptional, IsBoolean, Min } from 'class-validator';
import { RouteStatus } from '../entities/route.entity';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsString()
  departureCity: string;

  @IsString()
  arrivalCity: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  distance?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedDuration?: number;

  @IsString()
  departureTime: string;

  @IsString()
  @IsOptional()
  arrivalTime?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(RouteStatus)
  @IsOptional()
  status?: RouteStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stops?: string[];

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  vehicleId: string;
}
