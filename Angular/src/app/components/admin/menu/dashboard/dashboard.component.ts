import { Component, OnInit } from '@angular/core';
import { UserObjService } from '../../../../services/userObj.service';
import { UserSignalService } from '../../../../services/user-signal.service';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../../../services/auth.service';
import { ResModel } from '../../../../@models/resModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { 'collision-id': 'DashboardComponent' },
})
export class DashboardComponent implements OnInit {
  refresh() {
    let refreshToken = this.userSignal.getUserRefreshToken();
    const header = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    let form = new FormData();
    form.append('refreshToken', refreshToken);
    // this.httpClient
    //   .post('https://localhost:7043/api/account/refresh-token', form)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.authService.refreshToken(refreshToken).subscribe((res) => {
      console.log(res);
    });
  }
  // MyUser = signal<UserDto | null>(null);
  constructor(
    private userObjService: UserObjService,
    private userSignal: UserSignalService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    // this.userObjService.user$?.subscribe((user) => {
    //   if (user) {
    //     this.MyUser = user;
    //     // console.log('>>> user: ', this.MyUser);
    //   }
    // });
    let MyUser = this.userSignal.getUserSignal();

    console.log('>>> User Signal in dashboard', MyUser);
  }

  clear2() {}
}
