import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum RouteStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  departureCity: string;

  @Column()
  arrivalCity: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  distance: number; // in kilometers

  @Column({ type: 'int', nullable: true })
  estimatedDuration: number; // in minutes

  @Column({ type: 'time' })
  departureTime: string;

  @Column({ type: 'time', nullable: true })
  arrivalTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: RouteStatus,
    default: RouteStatus.ACTIVE,
  })
  status: RouteStatus;

  @Column({ type: 'json', nullable: true })
  stops: string[]; // Intermediate stops

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.routes)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: string;

  @OneToMany(() => Booking, (booking) => booking.route)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
