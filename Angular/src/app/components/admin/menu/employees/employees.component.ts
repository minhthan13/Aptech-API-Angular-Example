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
import { EmployeeHandlerService } from './employee-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ENVIROMENT } from '../../../../enviroments/enviroment';
import { ConfirmationService } from 'primeng/api';
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
    private employeeHandlerService: EmployeeHandlerService,
    private confirmationService: ConfirmationService
  ) {}
  imgUrl: string = ENVIROMENT.IMG_URL + '/account/';
  ngOnInit(): void {
    this.initAccountTable();
  }
  accounts: UserDto[];
  openDialog() {
    this.employeeHandlerService.HandleAddDialog(true);
  }
  onDialogEvent() {
    console.log('check event from add-dialg');
    this.initAccountTable();
  }

  deleteAccount(event: Event, id: number) {
    console.log('check btn');
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure delete account with id : "${id}"`,
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Yes',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        alert('delete confirm');
      },
      reject: () => {
        alert('delete cancel');
      },
    });
  }
  // table
  initAccountTable() {
    this.employeeService.getAllAccount().then(
      (res: ResModel) => {
        this.accounts = res.data as UserDto[];
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
