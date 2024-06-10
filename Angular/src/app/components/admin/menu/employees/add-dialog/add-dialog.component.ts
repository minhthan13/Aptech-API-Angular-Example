import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { EmployeeHandlerService } from '../employees.service';

@Component({
  selector: 'add-dialog-employee',
  templateUrl: './add-dialog.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
})
export class AddDialogDemo {
  constructor(
    private router: Router,
    private employeeHandlerService: EmployeeHandlerService
  ) {
    employeeHandlerService.isOpenAddDialog$.subscribe((value) => {
      this.isOpen = value;
    });
  }
  isOpen: boolean;

  onDialogHide() {
    this.isOpen = false;
  }
}
