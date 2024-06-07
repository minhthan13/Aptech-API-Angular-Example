import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutService } from '../../admin.layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  constructor(private adminLayoutService: AdminLayoutService) {}
  items: MenuItem[] | undefined;
  none: any;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Products', icon: 'pi pi-list' },
      { label: 'Messages', icon: 'pi pi-inbox' },
    ];
  }

  OpenSidebar() {
    this.adminLayoutService.HandleSidebar(true);
  }
}
