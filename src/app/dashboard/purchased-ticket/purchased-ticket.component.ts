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
    this.purchasedService.setStatusTrue(id).subscribe();
    let position = this.dataSource.findIndex(x => x === id);
    this.dataSource.splice(position, 1);
  }

  changeToggle() {
    this.toggle = !this.toggle;
    this.getTickets();
  }
}
