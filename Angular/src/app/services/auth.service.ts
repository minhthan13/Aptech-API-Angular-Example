import { effect, inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable, of, throwError } from 'rxjs';
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
    private router: Router,
    private httpClient: HttpClient
  ) {}
  baseURL = ENVIROMENT.API_URL;
  ENDPOINT = ENVIROMENT.END_POINT;

  Login(account) {
    return lastValueFrom(
      this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.LOGIN,
        account
      )
    );
  }

  //=================================================
  refreshToken(): Observable<ResModel> {
    try {
      const refreshToken = this.userSignal.getUserRefreshToken();
      if (!refreshToken) {
        return throwError(() => new Error('No user information available'));
      }

      let jsonRT = JSON.stringify(refreshToken);

      return this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
        jsonRT
      );
    } catch {
      return throwError(() => new Error('Failed to parse user information'));
    }
  }
  //=================================================
  // refreshToken(): Observable<ResModel | null> {
  //   if (typeof localStorage !== 'undefined') {
  //     let user = localStorage.getItem(ENVIROMENT.USER_STORAGE);

  //     let refreshToken = JSON.parse(user)?.refresh_token;
  //     if (!refreshToken) {
  //       return throwError(() => new Error('No Refresh Token available'));
  //     }
  //     let jsonRT = JSON.stringify(refreshToken);
  //     return this.httpClient.post<ResModel>(
  //       this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
  //       jsonRT
  //     );
  //   } else {
  //     return throwError(
  //       () => new Error('refresh token failed, locastorage is undefined')
  //     );
  //   }
  // }
}
