import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './dashboard/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './dashboard/login/login.component';
import {RegisterComponent} from './dashboard/register/register.component';
import {PurchasedTicketComponent} from './dashboard/purchased-ticket/purchased-ticket.component';
import {TicketsComponent} from './dashboard/tickets/tickets.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'purchased-ticket', component: PurchasedTicketComponent, canActivate: [AuthGuard]},
  { path: 'tickets/film/:id', component: TicketsComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(appRoutes);
