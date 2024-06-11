import { Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResModel } from '../@models/resModel';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  baseURL = ENVIROMENT.API_URL;
  ENDPOINT = ENVIROMENT.END_POINT;
  constructor(private httpClient: HttpClient) {}
  getAllRole() {
    return lastValueFrom(
      this.httpClient.get<ResModel>(this.baseURL + this.ENDPOINT.ROLE.Get_All)
    );
  }
}
