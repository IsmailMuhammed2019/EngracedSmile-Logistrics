import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail('admin@engraced.com');
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminData = {
      email: 'admin@engraced.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+234 800 000 0000',
      role: 'ADMIN' as any,
      isActive: true,
      isEmailVerified: true,
    };

    const admin = await usersService.create(adminData);
    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await app.close();
  }
}

seedAdmin();