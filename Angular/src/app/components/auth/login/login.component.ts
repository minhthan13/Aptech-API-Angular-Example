import { Component, OnInit } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ResModel } from '../../../@models/resModel';
import { UserDto } from '../../../@models/UserDto';
import { UserObjService } from '../../../services/userObj.service';
import { UserSignalService } from '../../../services/user-signal.service';
import { ToastrService } from 'ngx-toastr';
import { ENVIROMENT } from '../../../enviroments/enviroment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    NgStyle,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  host: { 'collision-id': 'LoginComponent' },
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userObjService: UserObjService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userSignal: UserSignalService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initFormLogin();
    // if (typeof localStorage !== 'undefined') {
    //   localStorage.removeItem(ENVIROMENT.USER_STORAGE);
    // }
  }
  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('invalid username or password');
    } else {
      this.authService.Login(this.loginForm.value).then(
        (res: ResModel) => {
          if (res.data || res.code === 200) {
            let user: UserDto = res.data as UserDto;
            this.userSignal.setUserSignal(user);
            this.toastr.success('login success', 'success');
            this.router.navigate(['/admin']);
          }
        },
        (err) => {
          this.toastr.error('invalid username or password');
        }
      );
    }
  }

  //========== with observable

  // login() {
  //   if (this.loginForm.invalid) {
  //     alert('invalid');
  //   } else {
  //     this.authService.Login(this.loginForm.value).then(
  //       (res: ResModel) => {
  //         if (res.data || res.code === 200) {
  //           let user: UserDto = res.data as UserDto;
  //           console.log('>>> resdata:', res.data);

  //           this.userObjService.setUser(user);
  //           this.router.navigate(['/dashboard']);
  //         }
  //       },
  //       (err) => {
  //         alert(err);
  //       }
  //     );
  //   }
  // }
  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
