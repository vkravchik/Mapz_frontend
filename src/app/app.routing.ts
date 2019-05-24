import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './dashboard/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './dashboard/login/login.component';
import {RegisterComponent} from './dashboard/register/register.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
