import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  number = signal(1);

  get numberSignal() {
    return this.number();
  }

  setNumber() {
    this.number.update((value) => value + 1);
  }
}
