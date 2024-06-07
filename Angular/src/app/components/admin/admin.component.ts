import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [RouterOutlet, TopbarComponent, FooterComponent, SidebarComponent],
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {}
}
