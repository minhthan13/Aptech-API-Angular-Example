import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENVIROMENT } from '../enviroments/enviroment';
import { UserDto } from '../@models/UserDto';

@Injectable({
  providedIn: 'root',
})
export class UserObjService {
  private userSubject: BehaviorSubject<UserDto | null>;
  public user$: Observable<UserDto | null>;

  constructor() {
    let userStorage: UserDto | null = null;
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(ENVIROMENT.USER_STORAGE);
      if (storedUser) {
        userStorage = JSON.parse(storedUser);
      }
    }
    this.userSubject = new BehaviorSubject<UserDto | null>(userStorage);
    this.user$ = this.userSubject.asObservable();
  }

  setUser(user: UserDto) {
    if (this.userSubject) {
      this.userSubject.next(user);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ENVIROMENT.USER_STORAGE, JSON.stringify(user));
    }
  }

  getUser(): UserDto | null {
    return this.userSubject ? this.userSubject.value : null;
  }

  clearUser() {
    if (this.userSubject) {
      this.userSubject.next(null);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    }
  }
}
