import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum, MinLength } from 'class-validator';

export enum UserRole {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  HR = 'HR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export class CreateUserDto {
  @ApiProperty({ description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole, default: UserRole.PASSENGER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.PASSENGER;

  @ApiProperty({ description: 'User status', enum: UserStatus, default: UserStatus.PENDING })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus = UserStatus.PENDING;
}
