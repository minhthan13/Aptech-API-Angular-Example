import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeHandlerService {
  private AddDialog = new BehaviorSubject<boolean>(false);
  isOpenAddDialog$ = this.AddDialog.asObservable();

  HandleAddDialog(status: boolean) {
    if (typeof status === 'boolean') {
      this.AddDialog.next(status);
    } else {
      console.error('type of invalid for admin.menu.employee.service !!!');
    }
  }
}
