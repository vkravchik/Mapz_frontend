import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppMaterialModule} from './app-material/app-material.module';
import {LoginComponent} from './dashboard/login/login.component';
import {RegisterComponent} from './dashboard/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HomeComponent} from './dashboard/home/home.component';
import {routing} from './app.routing';
import {PurchasedTicketComponent} from './dashboard/purchased-ticket/purchased-ticket.component';
import {TicketsComponent} from './dashboard/tickets/tickets.component';
import {PaymentComponent} from './dashboard/dialogs/payment/payment.component';
import {DatePipe} from '@angular/common';
import {AdminComponent} from './dashboard/admin/admin.component';
import {FilmDialogsComponent} from './dashboard/dialogs/film-dialogs/film-dialogs.component';
import {MatChipsModule} from '@angular/material';
import { AdminTicketsComponent } from './dashboard/admin/admin-tickets/admin-tickets.component';
import { TicketDialogComponent } from './dashboard/dialogs/ticket-dialog/ticket-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PurchasedTicketComponent,
    TicketsComponent,
    PaymentComponent,
    AdminComponent,
    FilmDialogsComponent,
    AdminTicketsComponent,
    TicketDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatChipsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe

  ],
  entryComponents: [
    PaymentComponent,
    FilmDialogsComponent,
    TicketDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
