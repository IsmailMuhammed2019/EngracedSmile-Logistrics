import { IsEnum, IsString, IsOptional, IsNumber, IsDateString, IsUUID } from 'class-validator';
import { BookingType } from '../entities/booking.entity';

export class CreateBookingDto {
  @IsEnum(BookingType)
  type: BookingType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  // Car booking fields
  @IsOptional()
  @IsString()
  pickupLocation?: string;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsDateString()
  pickupDate?: string;

  @IsOptional()
  @IsString()
  pickupTime?: string;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @IsNumber()
  passengers?: number;

  @IsOptional()
  @IsString()
  driverId?: string;

  // Flight booking fields
  @IsOptional()
  @IsString()
  departureAirport?: string;

  @IsOptional()
  @IsString()
  arrivalAirport?: string;

  @IsOptional()
  @IsDateString()
  departureDate?: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @IsOptional()
  @IsString()
  airline?: string;

  @IsOptional()
  @IsString()
  flightNumber?: string;

  // Logistics fields
  @IsOptional()
  @IsString()
  itemType?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;
}
