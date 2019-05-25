import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.ticketService.getAllById(this.route.snapshot.params['id']).subscribe(res => {
      console.log(res);
    });
  }

}
