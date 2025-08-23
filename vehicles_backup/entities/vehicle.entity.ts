import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { User } from '../../users/entities/user.entity';

export enum VehicleType {
  SIENNA = 'sienna',
  LUXURY = 'luxury',
  EXECUTIVE = 'executive',
  BUS = 'bus',
  VAN = 'van',
}

export enum VehicleStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
  RETIRED = 'retired',
}

export enum FuelType {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  plateNumber: string;

  @Column({ length: 100 })
  model: string;

  @Column({ length: 100 })
  make: string;

  @Column()
  year: number;

  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.SIENNA,
  })
  type: VehicleType;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status: VehicleStatus;

  @Column({
    type: 'enum',
    enum: FuelType,
    default: FuelType.PETROL,
  })
  fuelType: FuelType;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  currentOccupancy: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  mileage: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  vin: string;

  @Column({ nullable: true })
  engineNumber: string;

  @Column({ nullable: true })
  chassisNumber: string;

  @Column({ nullable: true })
  insuranceExpiry: Date;

  @Column({ nullable: true })
  registrationExpiry: Date;

  @Column({ nullable: true })
  lastMaintenance: Date;

  @Column({ nullable: true })
  nextMaintenance: Date;

  @Column({ type: 'text', nullable: true })
  features: string; // JSON string of features like AC, WiFi, etc.

  @Column({ type: 'text', nullable: true })
  images: string; // JSON array of image URLs

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  hourlyRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dailyRate: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedDriverId' })
  assignedDriver: User;

  @Column({ nullable: true })
  assignedDriverId: string;

  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips: Trip[];

  get availableSeats(): number {
    return this.capacity - this.currentOccupancy;
  }

  get occupancyPercentage(): number {
    return (this.currentOccupancy / this.capacity) * 100;
  }

  get isFullyBooked(): boolean {
    return this.currentOccupancy >= this.capacity;
  }
}
