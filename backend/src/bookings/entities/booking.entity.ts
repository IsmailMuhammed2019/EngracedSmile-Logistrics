import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum BookingType {
  CAR = 'car',
  FLIGHT = 'flight',
  LOGISTICS = 'logistics',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_TRANSIT = 'in_transit',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookingNumber: string;

  @Column({
    type: 'enum',
    enum: BookingType,
  })
  type: BookingType;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Car booking specific fields
  @Column({ nullable: true })
  pickupLocation: string;

  @Column({ nullable: true })
  destination: string;

  @Column({ nullable: true })
  pickupDate: Date;

  @Column({ nullable: true })
  pickupTime: string;

  @Column({ nullable: true })
  vehicleType: string;

  @Column({ type: 'int', nullable: true })
  passengers: number;

  @Column({ nullable: true })
  driverId: string;

  // Flight booking specific fields
  @Column({ nullable: true })
  departureAirport: string;

  @Column({ nullable: true })
  arrivalAirport: string;

  @Column({ nullable: true })
  departureDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({ nullable: true })
  airline: string;

  @Column({ nullable: true })
  flightNumber: string;

  // Logistics specific fields
  @Column({ nullable: true })
  itemType: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  dimensions: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({ nullable: true })
  deliveryDate: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
