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
import { Route } from './route.entity';
import { Driver } from './driver.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum VehicleType {
  SIENNA = 'sienna',
  SIENNA_EXECUTIVE = 'sienna_executive',
  SIENNA_VIP = 'sienna_vip',
}

export enum VehicleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

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

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerTrip: number;

  @Column({ type: 'json' })
  features: string[];

  @Column({ type: 'json' })
  images: string[];

  @Column({ nullable: true })
  plateNumber: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'text', nullable: true })
  specifications: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  totalTrips: number;

  @ManyToOne(() => Driver, { nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Column({ nullable: true })
  driverId: string;

  @OneToMany(() => Route, (route) => route.vehicle)
  routes: Route[];

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
