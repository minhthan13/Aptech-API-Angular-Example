import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { UserSignalService } from '../services/user-signal.service';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authToken = inject(UserSignalService).getUserSignal?.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
  const clonedRequest = req.clone({
    setHeaders: headers,
  });
  console.log('> Access Token in interceptor: ', authToken);
  return next(clonedRequest);
}
