import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/admin/menu/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeesComponent } from './components/admin/menu/employees/employees.component';
import { RequestsComponent } from './components/admin/menu/requests/requests.component';

const adminRoute: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'requests', component: RequestsComponent },
    ],
  },
];
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  ...adminRoute,
  { path: 'employees', redirectTo: 'admin/employees', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'requests', redirectTo: 'admin/requests', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
