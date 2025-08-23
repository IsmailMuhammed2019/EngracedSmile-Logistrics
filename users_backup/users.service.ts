import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(query?: any): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (query?.role) {
      queryBuilder.andWhere('user.role = :role', { role: query.role });
    }

    if (query?.status) {
      queryBuilder.andWhere('user.status = :status', { status: query.status });
    }

    if (query?.search) {
      queryBuilder.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['bookings', 'trips'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Check if email or phone is being updated and if it already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
      const existingUser = await this.findByPhone(updateUserDto.phone);
      if (existingUser) {
        throw new ConflictException('Phone number already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    const user = await this.findOne(id);
    user.status = status;
    return this.userRepository.save(user);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.userRepository.save(user);
  }

  async getDrivers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.DRIVER },
      relations: ['trips'],
    });
  }

  async getPassengers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.PASSENGER },
      relations: ['bookings'],
    });
  }

  async getAdmins(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });
  }

  async getStats() {
    const totalUsers = await this.userRepository.count();
    const activeUsers = await this.userRepository.count({
      where: { status: UserStatus.ACTIVE },
    });
    const drivers = await this.userRepository.count({
      where: { role: UserRole.DRIVER },
    });
    const passengers = await this.userRepository.count({
      where: { role: UserRole.PASSENGER },
    });

    return {
      totalUsers,
      activeUsers,
      drivers,
      passengers,
      inactiveUsers: totalUsers - activeUsers,
    };
  }
}
