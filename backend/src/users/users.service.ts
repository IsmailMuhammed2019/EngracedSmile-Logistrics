import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterDto, UpdateProfileDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create(registerDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'isActive', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findById(id);
    
    Object.assign(user, updateProfileDto);
    await this.usersRepository.save(user);
    
    return this.findById(id);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLogin: new Date() });
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.usersRepository.update(id, { password: hashedPassword });
  }

  async deactivateUser(id: string): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }

  async activateUser(id: string): Promise<void> {
    await this.usersRepository.update(id, { isActive: true });
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({
      where: { role },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'isActive', 'createdAt'],
    });
  }

  async getStats(): Promise<{ total: number; active: number; byRole: Record<UserRole, number> }> {
    const total = await this.usersRepository.count();
    const active = await this.usersRepository.count({ where: { isActive: true } });
    
    const byRole: Record<UserRole, number> = {
      [UserRole.ADMIN]: 0,
      [UserRole.CUSTOMER]: 0,
      [UserRole.DRIVER]: 0,
      [UserRole.MANAGER]: 0,
    };

    for (const role of Object.values(UserRole)) {
      byRole[role] = await this.usersRepository.count({ where: { role } });
    }

    return { total, active, byRole };
  }
}
