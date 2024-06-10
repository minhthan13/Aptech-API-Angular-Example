import { inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { ResModel } from '../@models/resModel';
import { UserSignalService } from './user-signal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userSignal: UserSignalService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  baseURL = ENVIROMENT.API_URL;
  ENDPOINT = ENVIROMENT.END_POINT;

  httpClient = inject(HttpClient);
  Login(account) {
    return lastValueFrom(
      this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.LOGIN,
        account
      )
    );
  }

  //=================================================

  //=================================================
  refreshToken(): Observable<ResModel> {
    if (typeof localStorage !== 'undefined') {
      let user = localStorage.getItem(ENVIROMENT.USER_STORAGE);

      let refreshToken = JSON.parse(user)?.refresh_token;
      if (!refreshToken) {
        return throwError(() => new Error('No Refresh Token available'));
      }
      let jsonRT = JSON.stringify(refreshToken);
      return this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
        jsonRT
      );
    }
    return null;
  }
}
