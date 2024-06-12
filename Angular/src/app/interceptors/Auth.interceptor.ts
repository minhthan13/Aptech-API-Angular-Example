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
  const authToken = userSignalService.getAccessToken();
  let clonedRequest = req;
  if (authToken) {
    clonedRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${authToken}`),
    });
  }
  // if (req.url.includes('/refresh-token')) {
  //   return next(req);
  // }
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      let refresh_token = userSignalService.getUserRefreshToken();
      if (error.status === 401 && refresh_token != null) {
        // Token expired, try refreshing the token
        return authService.refreshToken(refresh_token).pipe(
          switchMap((res: ResModel) => {
            // Update the user signal with new access token
            userSignalService.setUserSignal({
              ...userSignalService.getUserSignal(),
              access_token: res.data.access_token,
            });

            // Clone the request with the new token
            const newAuthToken = res.data.access_token;
            const newRequest = req.clone({
              headers: req.headers.append(
                'Authorization',
                `Bearer ${newAuthToken}`
              ),
            });
            // Retry the original request with the new token
            return next(newRequest);
          }),
          catchError((refreshError: any) => {
            // If refresh also fails, logout the user and redirect to login
            userSignalService.setUserSignal(null);
            return throwError(() => {
              router.navigate(['/login']);
              return refreshError;
            });
          })
        );
      } else {
        // If the error is not 401 or request is for refresh token, propagate the error
        return throwError(() => error);
      }
    })
  );
}
