import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail('admin@engraced.com');
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = await usersService.create({
      email: 'admin@engraced.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      phone: '+234 801 234 5678',
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@engraced.com');
    console.log('🔑 Password: admin123');
    console.log('🆔 User ID:', adminUser.id);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

seedAdmin();
