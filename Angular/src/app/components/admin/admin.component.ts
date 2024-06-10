import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { UserSignalService } from '../../services/user-signal.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [
    RouterOutlet,
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmPopupModule,
    NgClass,
  ],
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(
    private userSignal: UserSignalService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}
  Logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to Logout?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userSignal.clearUser();
        this.toastr.success('See Yout late !!', 'Log Out!');
        this.router.navigate(['/']);
      },
    });
  }
}
