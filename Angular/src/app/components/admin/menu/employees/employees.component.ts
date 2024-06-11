import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserDto } from '../../../../@models/UserDto';
import { EmployeesService } from '../../../../services/employees.service';
import { ResModel } from '../../../../@models/resModel';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AddDialogDemo } from './add-dialog/add-dialog.component';
import { EmployeeHandlerService } from './employees.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  imports: [
    CurrencyPipe,
    TableModule,
    TagModule,
    StyleClassModule,
    ButtonModule,
    AddDialogDemo,
    ReactiveFormsModule,
  ],
})
export class EmployeesComponent implements OnInit {
  constructor(
    private employeeService: EmployeesService,
    private employeeHandlerService: EmployeeHandlerService
  ) {
    this.initAccountTable();
  }
  openDialog() {
    this.employeeHandlerService.HandleAddDialog(true);
  }

  accounts: UserDto[];
  ngOnInit(): void {}

  // table
  initAccountTable() {
    this.employeeService.getAllAccount().then(
      (res: ResModel) => {
        this.accounts = res.data as UserDto[];
        console.log(this.accounts);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getSeverity(role: string) {
    switch (role) {
      case 'staff':
        return 'success';
      case 'admin':
        return 'warning';
      case 'support':
        return 'danger';
      default:
        return 'success';
    }
  }
}
