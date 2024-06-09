import { inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResModel } from '../@models/resModel';
import { UserSignalService } from './user-signal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userSignal: UserSignalService) {}
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
  refreshToken() {
    let refreshToken = this.userSignal.getUserSignal.refresh_token;
    console.log(refreshToken);

    return lastValueFrom(
      this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.AUTH.REFRESH_TOKEN,
        JSON.stringify(refreshToken)
      )
    );
  }
}
