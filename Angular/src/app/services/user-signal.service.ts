import { Injectable, Signal, signal } from '@angular/core';
import { UserDto } from '../@models/UserDto';
import { ENVIROMENT } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  private user$ = signal<UserDto | null>(null);
  constructor() {
    let userStorage: UserDto | null = null;
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(ENVIROMENT.USER_STORAGE);
      if (storedUser) {
        userStorage = JSON.parse(storedUser);
      }
    }
    this.user$.set(userStorage);
  }

  setUserSignal(user: UserDto) {
    if (this.user$ != null) {
      this.user$.set(user);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ENVIROMENT.USER_STORAGE, JSON.stringify(user));
    }
  }
  getUserSignal() {
    return this.user$();
  }
  clearUser() {
    this.user$.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    }
  }
}
