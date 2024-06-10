import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserSignalService } from '../services/user-signal.service';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResModel } from '../@models/resModel';
import { Router } from '@angular/router';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const userSignalService = inject(UserSignalService);
  const toastService = inject(ToastrService);
  const router = inject(Router);
  const authToken = userSignalService.getUserSignal?.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
  const clonedRequest = req.clone({
    setHeaders: headers,
  });
  if (req.url.includes('/refresh-token')) {
    return next(req);
  }
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((res: ResModel) => {
            if (res && res.data) {
              // Update the user signal with the new access token
              userSignalService.setUserSignal({
                ...userSignalService.getUserSignal,
                access_token: res.data.access_token,
              });
              console.log('refresh success');
              const newHeaders = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${res.data.access_token}`,
              };
              const newRequest = req.clone({ setHeaders: newHeaders });

              return next(newRequest);
            } else {
              toastService.error('Refresh token failed', 'Error');
              router.navigate(['/login']);
              return throwError(() => new Error('Failed to refresh token'));
            }
          }),
          catchError((refreshError) => {
            toastService.error('Refresh token failed', 'Error');
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      } else {
        toastService.error('Refresh token failed', 'Error');
        router.navigate(['/login']);
        return throwError(() => error);
      }
    })
  );
}
