import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { UserSignalService } from '../../services/user-signal.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
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
  ],
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(
    private userSignal: UserSignalService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}
  Logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to Logout?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userSignal.clearUser();
        this.router.navigate(['/']);
      },
    });
  }
}
