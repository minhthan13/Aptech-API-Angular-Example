import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Injector,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutService } from '../../admin.layout.service';
import { Router } from '@angular/router';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  constructor(
    private adminLayoutService: AdminLayoutService,
    private router: Router,
    private testService: TestService,
    private injector: Injector
  ) {}
  items: MenuItem[] | undefined;
  none: any;
  count: number = 0;
  topbarSignal: Signal<number>;
  ngOnInit() {
    this.initMenu();
    this.topbarSignal = this.testService.number;
    effect(
      () => {
        this.count = this.topbarSignal();
        console.log(this.count);
      },
      { injector: this.injector }
    );
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
  OpenSidebar() {
    this.adminLayoutService.HandleSidebar(true);
  }
}
