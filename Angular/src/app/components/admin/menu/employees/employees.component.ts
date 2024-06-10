import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../../@models/UserDto';
import { EmployeesService } from '../../../../services/employees.service';
import { ResModel } from '../../../../@models/resModel';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StyleClassModule } from 'primeng/styleclass';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CurrencyPipe, TableModule, TagModule, StyleClassModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
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
  constructor(private employeeService: EmployeesService) {}
  accounts: UserDto[];
  ngOnInit(): void {
    this.initAccountTable();
  }

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
}
