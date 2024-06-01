import { Component, inject, OnInit } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
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
import { error } from 'console';
import { ResModel } from '../../../@models/resModel';
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
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  loginForm: FormGroup;
  authService = inject(AuthService);
  ngOnInit(): void {
    this.initFormLogin();
  }
  login() {
    if (this.loginForm.invalid) {
      alert('invalid');
    } else {
      this.authService.Login(this.loginForm.value).then(
        (res) => {
          if (res && res.code === 200) {
            this.router.navigate(['/dashboard']);
          }
        },
        (err) => {
          alert(err);
        }
      );
    }
  }
  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
