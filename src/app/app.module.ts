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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PurchasedTicketComponent,
    TicketsComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ],
  entryComponents: [
    PaymentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}