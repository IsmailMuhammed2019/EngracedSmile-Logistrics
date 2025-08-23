import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum TripStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

export enum TripType {
  INTER_STATE = 'inter_state',
  INTRA_STATE = 'intra_state',
  AIRPORT_TRANSFER = 'airport_transfer',
  CHARTER = 'charter',
}

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  tripNumber: string;

  @Column({ length: 100 })
  origin: string;

  @Column({ length: 100 })
  destination: string;

  @Column({
    type: 'enum',
    enum: TripType,
    default: TripType.INTER_STATE,
  })
  type: TripType;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.SCHEDULED,
  })
  status: TripStatus;

  @Column()
  departureTime: Date;

  @Column()
  estimatedArrivalTime: Date;

  @Column({ nullable: true })
  actualDepartureTime: Date;

  @Column({ nullable: true })
  actualArrivalTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fare: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distance: number; // in kilometers

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  duration: number; // in hours

  @Column({ default: 0 })
  bookedSeats: number;

  @Column({ type: 'text', nullable: true })
  route: string; // JSON array of waypoints

  @Column({ type: 'text', nullable: true })
  stops: string; // JSON array of stop locations

  @Column({ type: 'text', nullable: true })
  amenities: string; // JSON array of available amenities

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  departureTerminal: string;

  @Column({ nullable: true })
  arrivalTerminal: string;

  @Column({ nullable: true })
  gate: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLatitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLongitude: number;

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ nullable: true })
  recurringPattern: string; // JSON object for recurring schedule

  @Column({ default: 0 })
  maxBookings: number;

  @Column({ type: 'text', nullable: true })
  cancellationPolicy: string;

  @Column({ type: 'text', nullable: true })
  terms: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'driverId' })
  driver: User;

  @Column()
  driverId: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: string;

  @OneToMany(() => Booking, (booking) => booking.trip)
  bookings: Booking[];

  get availableSeats(): number {
    return this.vehicle?.capacity - this.bookedSeats || 0;
  }

  get isFullyBooked(): boolean {
    return this.bookedSeats >= (this.vehicle?.capacity || 0);
  }

  get occupancyPercentage(): number {
    const capacity = this.vehicle?.capacity || 0;
    return capacity > 0 ? (this.bookedSeats / capacity) * 100 : 0;
  }

  get isDelayed(): boolean {
    if (!this.actualDepartureTime) return false;
    return this.actualDepartureTime > this.departureTime;
  }

  get isCompleted(): boolean {
    return this.status === TripStatus.COMPLETED;
  }

  get isActive(): boolean {
    return this.status === TripStatus.IN_PROGRESS;
  }
}
