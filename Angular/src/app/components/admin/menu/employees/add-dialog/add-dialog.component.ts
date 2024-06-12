import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DateConvertService } from '../../../../../services/utils/date-convert.service';
import { RoleDto } from '../../../../../@models/RoleDto';
import { RoleService } from '../../../../../services/role.service';
import { EmployeeHandlerService } from '../employee-handler.service';
import { EmployeesService } from '../../../../../services/employees.service';
import { FileUploadHelper } from '../../../../../services/helpers/file-upload';

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
export class AddDialogDemo implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private employeeHandlerService: EmployeeHandlerService,
    private employeeService: EmployeesService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    employeeHandlerService.isOpenAddDialog$.subscribe((value) => {
      this.isOpen = value;
    });
    this.initFormAddNew();
    this.roleService.getAllRole().then((res) => {
      if (res.data && res.data.length > 0) {
        this.rolesList = res.data as RoleDto[];
      }
    });
  }

  @Output() initEmployeeComponet = new EventEmitter<void>();
  formAddNewEployee!: FormGroup;
  isOpen: boolean;
  rolesList!: RoleDto[];
  currentImage: string = 'assets/images/account/default-profile.png';
  ngOnInit(): void {}

  addNew() {
    let date = this.formAddNewEployee.controls['dob'].value;
    let dateConver = DateConvertService.formatDate(date);
    this.formAddNewEployee.controls['dob'].setValue(dateConver);

    let { Cpassword, ...newForm } = this.formAddNewEployee.value;
    this.employeeService.AddNewEmployee(newForm).then(
      (res) => {
        console.log(res);
        this.initEmployeeComponet.emit();
        this.CancelDiaglog();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onFileSelected(event: any) {
    FileUploadHelper.onFileSelected(
      event,
      this.currentImage,
      (result: string) => {
        this.currentImage = result;
      }
    );
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
  ngOnDestroy(): void {
    this.employeeHandlerService.HandleAddDialog(false);
  }
}
