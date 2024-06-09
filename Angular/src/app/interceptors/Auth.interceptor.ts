import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserSignalService } from '../services/user-signal.service';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });
  // const authToken = inject(UserSignalService).getUserSignal?.access_token;
  // if (authToken) {
  //   const newReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  //   });
  //   return next(newReq);
  // }

  return next(clonedRequest);
}
