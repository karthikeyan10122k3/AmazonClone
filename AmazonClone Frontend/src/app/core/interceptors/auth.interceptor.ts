import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const authService = inject(AuthService);
    const token = authService.getToken();

    const modifiedRequest = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;
        
    return next(modifiedRequest);
  } catch (error) {
    console.error('Interceptor error:', error);
    return next(req);
  }
};
