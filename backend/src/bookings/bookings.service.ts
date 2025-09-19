import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus, PaymentStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      userId,
    });
    return await this.bookingsRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.findById(id);
    booking.status = status;
    return this.bookingsRepository.save(booking);
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Booking> {
    const booking = await this.findById(id);
    booking.paymentStatus = paymentStatus;
    return this.bookingsRepository.save(booking);
  }

  async getStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    totalRevenue: number;
  }> {
    const total = await this.bookingsRepository.count();
    const totalRevenue = await this.bookingsRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.amount)', 'total')
      .getRawOne();

    const byType = await this.bookingsRepository
      .createQueryBuilder('booking')
      .select('booking.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('booking.type')
      .getRawMany();

    const byStatus = await this.bookingsRepository
      .createQueryBuilder('booking')
      .select('booking.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('booking.status')
      .getRawMany();

    return {
      total,
      byType: byType.reduce((acc, item) => ({ ...acc, [item.type]: parseInt(item.count) }), {}),
      byStatus: byStatus.reduce((acc, item) => ({ ...acc, [item.status]: parseInt(item.count) }), {}),
      totalRevenue: parseFloat(totalRevenue.total) || 0,
    };
  }
}
