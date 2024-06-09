import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../../@models/UserDto';
import { EmployeesService } from '../../../../services/employees.service';
import { ResModel } from '../../../../@models/resModel';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  constructor(private employeeService: EmployeesService) {}
  accounts: UserDto[];
  ngOnInit(): void {
    this.employeeService.getAllAccount().then(
      (res: ResModel) => {
        console.log(res.data);
      },
      (err) => {
        console.log('>>> Error: get account failed ');
      }
    );
  }
}
