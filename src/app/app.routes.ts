import { Routes } from '@angular/router';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {ConfigPageComponent} from './pages/config-page/config-page.component'


export const routes: Routes = [
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'config', component: ConfigPageComponent }
      ]
    }
  ];
