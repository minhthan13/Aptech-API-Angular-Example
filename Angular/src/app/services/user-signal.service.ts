import { Injectable, Signal, signal } from '@angular/core';
import { UserDto } from '../@models/UserDto';
import { ENVIROMENT } from '../enviroments/enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserSignalService {
  private user = signal<UserDto | null>(null);
  readonly user$: Signal<UserDto>;
  constructor(private router: Router) {
    let userStorage: UserDto | null = null;
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem(ENVIROMENT.USER_STORAGE);
      if (storedUser) {
        userStorage = JSON.parse(storedUser);
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
  get getUserSignal() {
    return this.user$();
  }
  get getUserRefreshToken() {
    const rf = JSON.stringify(this.user$()?.refresh_token);
    return rf;
  }
  clearUser() {
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
      this.router.navigate(['/login']);
    }
  }

  clearUser2() {
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    }
  }
}
