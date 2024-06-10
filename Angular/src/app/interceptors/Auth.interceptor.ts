import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserSignalService } from '../services/user-signal.service';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

// export function authInterceptor(
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<unknown>> {
//   const authService = inject(AuthService);
//   const userSignalService = inject(UserSignalService);
//   const toastr = inject(ToastrService);
//   const authToken = userSignalService.getUserSignal?.access_token;
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(authToken && { Authorization: `Bearer ${authToken}` }),
//   };
//   const clonedRequest = req.clone({
//     setHeaders: headers,
//   });
//   // chặn request vô hạn
//   if (req.url.includes('/refresh-token')) {
//     return next(req);
//   }
//   return next(clonedRequest).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//         return authService.refreshToken().pipe(
//           switchMap((res) => {
//             if (res && res.data) {
//               const newHeaders = {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${res.data.access_token}`,
//               };
//               const newRequest = req.clone({
//                 setHeaders: newHeaders,
//               });
//               return next(newRequest);
//             } else {
//               userSignalService.clearUser();
//               return throwError(() => new Error('Failed to refresh token'));
//             }
//           }),
//           catchError((refreshError) => {
//             userSignalService.clearUser();
//             return throwError(() => refreshError);
//           })
//         );
//       } else {
//         return throwError(() => error);
//       }
//     })
//   );
// }

//****************** */

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const userSignalService = inject(UserSignalService);
  const authToken = userSignalService.getUserSignal?.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
  const clonedRequest = req.clone({
    setHeaders: headers,
  });

  // Chặn request vô hạn
  if (req.url.includes('/refresh-token')) {
    return next(req);
  }

  return from(
    handleRequest(clonedRequest, next, authService, userSignalService)
  );
}
async function handleRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  userSignalService: UserSignalService
): Promise<HttpEvent<unknown>> {
  const toastr = inject(ToastrService);
  try {
    const event = await next(req).toPromise();
    return event;
  } catch (error) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      try {
        const res = await authService.refreshToken();
        if (res && res.data) {
          const newHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res.data.access_token}`,
          };
          const newRequest = req.clone({
            setHeaders: newHeaders,
          });
          return await next(newRequest).toPromise();
        } else {
          userSignalService.clearUser();
          toastr.error('Failed to refresh token', 'Error');
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        toastr.error('Failed to refresh token', 'Error');

        userSignalService.clearUser();
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
}
