import { inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  //===========================================================
  refreshToken() {
    let refreshToken = this.userSignal.getUserRefreshToken;
    if (!refreshToken) {
      this.toastr.error('No refresh token available', 'Error');
      this.userSignal.clearUser();
      return 0;
    }

    return lastValueFrom(
      this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
        refreshToken
      )
    )
      .then((res) => {
        if (res.data?.access_token) {
          this.userSignal.setUserSignal({
            ...this.userSignal.getUserSignal,
            access_token: res.data.access_token,
          });
          this.toastr.success(res.message, 'Success');
        } else {
          this.userSignal.clearUser();
          this.toastr.error('Failed to refresh token', 'Error');
        }
      })
      .catch((err) => {
        this.userSignal.clearUser();
        let mess = err.error?.message ?? 'Failed to refresh token';
        this.toastr.error(mess, 'Error');
      });
  }
  //=================================================
  // async refreshToken() {
  //   let refreshToken = this.userSignal.getUserRefreshToken;
  //   if (!refreshToken) {
  //     this.toastr.error('No refresh token available', 'Error');
  //     this.userSignal.clearUser();
  //   }

  //   try {
  //     const res = await lastValueFrom(
  //       this.httpClient.post<ResModel>(
  //         this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
  //         refreshToken
  //       )
  //     );

  //     if (res.data?.access_token) {
  //       this.userSignal.setUserSignal({
  //         ...this.userSignal.getUserSignal,
  //         access_token: res.data.access_token,
  //       });
  //       this.toastr.success(res.message, 'Success');
  //     } else {
  //       this.userSignal.clearUser();
  //       this.toastr.error('Failed to refresh token', 'Error');
  //       // return 'Failed to refresh token';
  //     }
  //   } catch (err) {
  //     this.userSignal.clearUser();
  //     let mess = err.error.message || 'Failed to refresh token';
  //     this.toastr.error(mess, 'Error');

  //     // return err.error.message || 'Failed to refresh token';
  //   }
  // }
  //=================================================
}
