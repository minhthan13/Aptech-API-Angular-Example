import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutService } from '../../admin.layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  constructor(
    private adminLayoutService: AdminLayoutService,
    private router: Router
  ) {}
  items: MenuItem[] | undefined;
  none: any;
  ngOnInit() {
    this.initMenu();
  }
  OpenSidebar() {
    this.adminLayoutService.HandleSidebar(true);
  }
  initMenu() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/dashboard']);
        },
      },
      {
        label: 'Employees',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/employees']);
        },
      },
      {
        label: 'Requests',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/requests']);
        },
      },
      {
        label: 'Not Found',
        icon: 'pi pi-exclamation-circle',
        command: () => {
          this.router.navigate(['/notfound']);
        },
      },
    ];
  }
}
