import { inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
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
  async refreshToken(): Promise<ResModel> {
    const refreshTokens = this.userSignal?.getUserRefreshToken;

    const jsonRT = JSON.stringify(refreshTokens);
    try {
      const res = await this.httpClient
        .post<ResModel>(this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN, jsonRT)
        .toPromise();

      if (res && res.data) {
        this.userSignal.setUserSignal({
          ...this.userSignal.getUserSignal,
          access_token: res.data.access_token,
        });
        return res;
      } else {
        this.userSignal.clearUser();
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      this.userSignal.clearUser();
      throw error;
    }
  }

  //=================================================
  // refreshToken() {
  //   let refreshToken = this.userSignal?.getUserRefreshToken;
  //   if (!refreshToken) {
  //     this.userSignal.clearUser();
  //     return throwError(() => new Error('No Refresh Token available'));
  //   }
  //   let jsonRT = JSON.stringify(refreshToken);
  //   return this.httpClient
  //     .post<ResModel>(this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN, jsonRT)
  //     .pipe(
  //       switchMap((res) => {
  //         if (res && res.data) {
  //           this.userSignal.setUserSignal({
  //             ...this.userSignal.getUserSignal,
  //             access_token: res.data.access_token,
  //           });
  //           return of(res);
  //         } else {
  //           this.userSignal.clearUser();
  //           return throwError(() => new Error('Failed to refresh token'));
  //         }
  //       }),
  //       catchError((error) => {
  //         this.userSignal.clearUser();
  //         return throwError(() => error);
  //       })
  //     );
  // }
}
