import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PurchasedService} from '../../services/purchased.service';

@Component({
  selector: 'app-purchased-ticket',
  templateUrl: './purchased-ticket.component.html',
  styleUrls: ['./purchased-ticket.component.scss']
})
export class PurchasedTicketComponent implements OnInit {

  toggle = false;
  dataSource;

  constructor(private http: HttpClient,
              private purchasedService: PurchasedService) {
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    if (this.toggle) {
      this.purchasedService.getAllByUseridArchived(localStorage.getItem('id')).subscribe(res => {
        this.dataSource = res;
        console.log(res);
      });
    } else {
      this.purchasedService.getAllByUserid(localStorage.getItem('id')).subscribe(res => {
        this.dataSource = res;
        console.log(res);
      });
    }
  }

  archiveTicket(id: number) {
    console.log(id);
    this.purchasedService.setStatusTrue(id).subscribe(res => {
      console.log(res);
    });
    this.getTickets();
  }

  changeToggle() {
    this.toggle = !this.toggle;
    this.getTickets();
  }
}
