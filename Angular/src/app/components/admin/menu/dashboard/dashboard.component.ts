import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../../../../services/userObj.service';
import { UserSignalService } from '../../../../services/user-signal.service';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../../../services/auth.service';
import { ResModel } from '../../../../@models/resModel';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { 'collision-id': 'DashboardComponent' },
})
export class DashboardComponent implements OnInit {
  // MyUser = signal<UserDto | null>(null);
  constructor(
    private userObjService: UserObjService,
    private userSignal: UserSignalService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // this.userObjService.user$?.subscribe((user) => {
    //   if (user) {
    //     this.MyUser = user;
    //     // console.log('>>> user: ', this.MyUser);
    //   }
    // });
    let MyUser = this.userSignal.getUserSignal;

    console.log('>>> User Signal in dashboard', MyUser);
  }
  async Refresh() {
    await this.authService.refreshToken();
  }
  clear2() {
    this.userSignal.clearUser2();
  }
}
