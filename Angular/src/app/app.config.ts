import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './interceptors/Auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    BrowserModule,
    provideAnimations(),
    // BrowserAnimationsModule,
    HttpClientModule,
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    //
    // toastify config
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // from PrimeNg
    ConfirmationService,
    MessageService,
  ],
};
