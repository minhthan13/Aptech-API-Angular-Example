import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router } from '@angular/router';
import { EmployeeHandlerService } from '../employees.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DateConvertService } from '../../../../../services/utils/date-convert.service';
import { RoleDto } from '../../../../../@models/RoleDto';
import { RoleService } from '../../../../../services/role.service';

@Component({
  selector: 'add-dialog-employee',
  templateUrl: './add-dialog.component.html',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    CalendarModule,
    MultiSelectModule,
  ],
  styleUrl: './add-dialog.component.css',
})
export class AddDialogDemo implements OnInit {
  constructor(
    private router: Router,
    private employeeHandlerService: EmployeeHandlerService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    employeeHandlerService.isOpenAddDialog$.subscribe((value) => {
      this.isOpen = value;
    });

    this.initFormAddNew();
    this.roleService.getAllRole().then((res) => {
      console.log(res);
      if (res.data && res.data.length > 0) {
        this.rolesList = res.data as RoleDto[];
      }
    });
  }
  formAddNewEployee!: FormGroup;
  isOpen: boolean;
  rolesList!: RoleDto[];

  ngOnInit(): void {}

  addNew() {
    let date = this.formAddNewEployee.controls['dob'].value;
    let dateConver = DateConvertService.formatDate(date);
    this.formAddNewEployee.controls['dob'].setValue(dateConver);

    let { Cpassword, ...newForm } = this.formAddNewEployee.value;
    console.log('>>> check new form: ', newForm);
  }
  onDialogHide() {
    this.isOpen = false;
  }
  CancelDiaglog() {
    this.isOpen = false;
    this.formAddNewEployee.reset();
  }
  initFormAddNew() {
    // this.formAddNewEployee = new FormGroup({
    //   username: new FormControl(''),
    //   fullName: new FormControl(''),
    //   password: new FormControl(''),
    //   Cpassword: new FormControl(''),
    //   dob: new FormControl(''),
    //   roles: new FormControl<RoleDto[] | null>([]),
    // });

    this.formAddNewEployee = this.formBuilder.group({
      username: '',
      fullName: '',
      password: '',
      Cpassword: '',
      dob: '',
      roles: new FormControl<RoleDto[] | null>([]),
    });
  }
}
