import {
  computed,
  effect,
  Injectable,
  OnChanges,
  OnInit,
  Signal,
  signal,
  SimpleChanges,
} from '@angular/core';
import { UserDto } from '../@models/UserDto';
import { ENVIROMENT } from '../enviroments/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  private user = signal<UserDto | null>(null);
  user$!: Signal<UserDto | null>;
  constructor() {
    let userStorage: UserDto;
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(ENVIROMENT.USER_STORAGE);
      if (storedUser) {
        try {
          userStorage = JSON.parse(storedUser);
        } catch (e) {
          console.error('Error parsing stored user from localStorage', e);
        }
      }
    }
    this.user.set(userStorage);
    this.user$ = this.user;
  }

  setUserSignal(user: UserDto) {
    this.user.set(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ENVIROMENT.USER_STORAGE, JSON.stringify(user));
    }
  }

  getUserSignal(): UserDto {
    return this.user$();
  }

  getAccessToken(): string | null {
    const user = this.getUserSignal();
    return user ? user.access_token : null;
  }

  getUserRefreshToken(): string | null {
    const user = this.getUserSignal();
    return user ? user.refresh_token : null;
  }

  clearUser() {
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    }
  }
}
