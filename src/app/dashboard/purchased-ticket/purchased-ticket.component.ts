import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-purchased-ticket',
  templateUrl: './purchased-ticket.component.html',
  styleUrls: ['./purchased-ticket.component.scss']
})
export class PurchasedTicketComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/tickets`).subscribe(res => {
      console.log(res);
    });
  }

}
