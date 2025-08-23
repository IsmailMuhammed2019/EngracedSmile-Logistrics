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
import { Trip } from '../../trips/entities/trip.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  EXPIRED = 'expired',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIAL_REFUND = 'partial_refund',
}

export enum PaymentMethod {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  WALLET = 'wallet',
  USSD = 'ussd',
  CASH = 'cash',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  bookingNumber: string;

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

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  refundAmount: number;

  @Column({ nullable: true })
  seatNumber: string;

  @Column({ nullable: true })
  pickupLocation: string;

  @Column({ nullable: true })
  dropoffLocation: string;

  @Column({ nullable: true })
  passengerName: string;

  @Column({ nullable: true })
  passengerPhone: string;

  @Column({ nullable: true })
  passengerEmail: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  specialRequests: string;

  @Column({ type: 'text', nullable: true })
  luggage: string; // JSON object for luggage details

  @Column({ default: 1 })
  numberOfPassengers: number;

  @Column({ type: 'text', nullable: true })
  passengerDetails: string; // JSON array for multiple passengers

  @Column({ nullable: true })
  bookingDate: Date;

  @Column({ nullable: true })
  confirmationDate: Date;

  @Column({ nullable: true })
  cancellationDate: Date;

  @Column({ nullable: true })
  cancellationReason: string;

  @Column({ nullable: true })
  refundDate: Date;

  @Column({ nullable: true })
  refundReason: string;

  @Column({ nullable: true })
  paymentReference: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  receiptUrl: string;

  @Column({ type: 'text', nullable: true })
  paymentDetails: string; // JSON object for payment gateway response

  @Column({ nullable: true })
  expiryTime: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ default: false })
  isCancelled: boolean;

  @Column({ default: false })
  isRefunded: boolean;

  @Column({ type: 'text', nullable: true })
  cancellationPolicy: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  cancellationFee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'passengerId' })
  passenger: User;

  @Column()
  passengerId: string;

  @ManyToOne(() => Trip)
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column()
  tripId: string;

  get isExpired(): boolean {
    return this.expiryTime ? new Date() > this.expiryTime : false;
  }

  get isActive(): boolean {
    return this.status === BookingStatus.CONFIRMED && !this.isExpired;
  }

  get canBeCancelled(): boolean {
    return this.status === BookingStatus.CONFIRMED && !this.isExpired;
  }

  get remainingAmount(): number {
    return this.amount - this.paidAmount;
  }

  get isFullyPaid(): boolean {
    return this.paidAmount >= this.amount;
  }

  get isPartiallyPaid(): boolean {
    return this.paidAmount > 0 && this.paidAmount < this.amount;
  }
}
