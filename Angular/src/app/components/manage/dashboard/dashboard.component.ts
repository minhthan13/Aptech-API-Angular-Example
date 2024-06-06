import { Component, Injector, OnInit, Signal, signal } from '@angular/core';
import { UserDto } from '../../../@models/UserDto';
import { UserObjService } from '../../../services/userObj.service';
import { UserSignalService } from '../../../services/user-signal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { 'collision-id': 'DashboardComponent' },
})
export class DashboardComponent implements OnInit {
  // MyUser = signal<UserDto | null>(null);
  constructor(
    private userObjService: UserObjService,
    private userSignal: UserSignalService,
    private injector: Injector
  ) {
    let MyUser = this.userSignal.getUserSignal();
    // effect(
    //   () => {
    //     this.MyUser();
    //   },
    //   { injector: this.injector }
    // );
    let username = MyUser?.username;
    console.log('>> check user dashboard ', username);
  }
  ngOnInit(): void {
    // this.userObjService.user$?.subscribe((user) => {
    //   if (user) {
    //     this.MyUser = user;
    //     // console.log('>>> user: ', this.MyUser);
    //   }
    // });
  }
}
