import { inject, Injectable } from '@angular/core';
import { ENVIROMENT } from '../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResModel } from '../@models/resModel';
import { UserDto } from '../@models/UserDto';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseURL = ENVIROMENT.API_URL;
  ENDPOINT = ENVIROMENT.END_POINT;
  constructor(private httpClient: HttpClient) {}
  getAllAccount() {
    return lastValueFrom(
      this.httpClient.get<ResModel>(
        this.baseURL + this.ENDPOINT.EMPLOYEES.Get_All
      )
    );
  }

  AddNewEmployee(form: FormData) {
    return lastValueFrom(
      this.httpClient.post<ResModel>(
        this.baseURL + this.ENDPOINT.EMPLOYEES.Add_New,
        form
      )
    );
  }
}
