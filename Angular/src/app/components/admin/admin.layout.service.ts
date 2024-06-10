import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminLayoutService {
  private SidebarOpen = new BehaviorSubject<boolean>(false);
  isSidebar$ = this.SidebarOpen.asObservable();

  HandleSidebar(status: boolean) {
    if (typeof status === 'boolean') {
      this.SidebarOpen.next(status);
    } else {
      console.error('type of invalid for admin.layout.service !!!');
    }
  }
}
