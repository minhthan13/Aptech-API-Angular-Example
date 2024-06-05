import { Component, inject, OnInit } from '@angular/core';
import { UserDto } from '../../../@models/UserDto';
import { UserObjService } from '../../../services/userObj.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { 'collision-id': 'DashboardComponent' },
})
export class DashboardComponent implements OnInit {
  MyUser: UserDto;
  constructor(private userObjService: UserObjService) {}
  ngOnInit(): void {
    this.userObjService.user$?.subscribe((user) => {
      if (user) {
        this.MyUser = user;
        console.log('>>> user: ', this.MyUser);
      }
    });
  }
}
