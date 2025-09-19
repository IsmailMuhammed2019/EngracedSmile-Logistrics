import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as csurf from 'csurf';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private csrfProtection = csurf({
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    }
  });

  use(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF for GET, HEAD, OPTIONS requests
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }

    // Skip CSRF for API routes that don't need it (like health checks)
    if (req.path.startsWith('/api/v1/health') || 
        req.path.startsWith('/api/v1/auth/login') ||
        req.path.startsWith('/api/v1/auth/register')) {
      return next();
    }

    this.csrfProtection(req as any, res as any, next);
  }
}
