import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../../services/film.service';
import {UserService} from '../../services/user.service';
import * as jwt_decode from 'jwt-decode';
import {PurchasedService} from '../../services/purchased.service';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material';
import {PaymentComponent} from '../dialogs/payment/payment.component';
import {filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  dataSoruceCard: any;
  dataSoruceTickets: any;
  choisedTicket: number;
  userId: number;

  constructor(private route: ActivatedRoute,
              private ticketService: TicketService,
              private filmService: FilmService,
              private userService: UserService,
              private purchasedService: PurchasedService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getFilm();
    this.getTickets();
    this.getUserId();
  }

  getFilm() {
    this.filmService.getSingle(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSoruceCard = res;
    });
  }

  getTickets() {
    this.ticketService.getAllById(this.route.snapshot.params['id']).subscribe(res => {
      this.dataSoruceTickets = res;
    });
  }

  getUserId() {
    const token = localStorage.getItem('token');
    const username = jwt_decode(token).username;
    this.userService.getByUsername(username).subscribe((res: User) => {
      this.userId = res.id;
    });
  }

  cooseTicket(id: any) {
    this.choisedTicket = id;
  }

  buysTicket() {
    const purchased = {
      ticket: {
        id: this.choisedTicket
      },
      user: {
        id: this.userId
      }
    };
    const dialogRef = this.dialog.open(PaymentComponent, {disableClose: true});
    dialogRef.afterClosed().pipe(
      filter((result) => result === 1),
      mergeMap(() => this.purchasedService.add(purchased))).subscribe(res => {
      console.log(res);
    });
  }
}
