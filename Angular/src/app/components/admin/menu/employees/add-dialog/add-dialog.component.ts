import {
  Component,
  EventEmitter,
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
import { DateConvertService } from '../../../../../services/helpers/date-convert';
import { RoleDto } from '../../../../../@models/RoleDto';
import { RoleService } from '../../../../../services/role.service';
import { EmployeeHandlerService } from '../employee-handler.service';
import { EmployeesService } from '../../../../../services/employees.service';
import { FileUploadHelper } from '../../../../../services/helpers/file-upload';
import { UserDto } from '../../../../../@models/UserDto';

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
  fileUpload: File;
  currentImage: string = 'assets/images/account/default-profile.png';
  ngOnInit(): void {}

  addNew() {
    let date = this.formAddNewEployee.controls['dob'].value;
    let dateConver = DateConvertService.formatDate(date);
    this.formAddNewEployee.controls['dob'].setValue(dateConver);

    let { Cpassword, ...newForm } = this.formAddNewEployee.value;

    console.log(newForm);
    console.log(this.fileUpload);
    let formdata = new FormData();
    if (this.fileUpload != null) {
      formdata.append('file', this.fileUpload);
    }
    let user = JSON.stringify(newForm);
    formdata.append('user', user);

    this.employeeService.AddNewEmployee(formdata).then(
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
    this.fileUpload = event.target.files[0];
    if (this.fileUpload != null) {
      FileUploadHelper.onFileSelectedPreview(event, (result: string) => {
        this.currentImage = result;
      });
      let newPhotoName = `${new Date().getTime()}_${this.fileUpload.name}`;
      this.formAddNewEployee.controls['photo'].setValue(newPhotoName);
    }
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
      photo: 'default-profile.png',
      roles: new FormControl<RoleDto[] | null>([]),
    });
  }
  ngOnDestroy(): void {
    this.employeeHandlerService.HandleAddDialog(false);
  }
}
