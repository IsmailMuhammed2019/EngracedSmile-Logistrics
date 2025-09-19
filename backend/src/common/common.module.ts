import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { LoggingMiddleware } from './middleware/logging.middleware';
import { SecurityMiddleware } from './middleware/security.middleware';
import { RateLimitMiddleware, AuthRateLimitMiddleware } from './middleware/rate-limit.middleware';
import { CsrfMiddleware } from './middleware/csrf.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
    
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
    
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes('*');
    
    consumer
      .apply(AuthRateLimitMiddleware)
      .forRoutes('auth/login', 'auth/register', 'auth/forgot-password');
    
    consumer
      .apply(CsrfMiddleware)
      .forRoutes('*');
  }
}
