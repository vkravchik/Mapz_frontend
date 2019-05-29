import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AlertService} from '../../../services/alert.service';
import {Router} from '@angular/router';
import {TicketService} from '../../../services/ticket.service';
import {TicketDialogComponent} from '../../dialogs/ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.scss']
})
export class AdminTicketsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'time', 'films', 'halls', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _ticket: TicketService,
              private alert: AlertService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAll() {
    this._ticket.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: {status: 1}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this._ticket.add(this._ticket.dialogData).subscribe(
          res => {
            this.dataSource.data.push(res);
            this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
          },
          (error) => {
            this.alert.error(error);
          });
      }
    });
  }

  deleteItem(id) {
    this._ticket.delete(id).subscribe(
      (res) => {
        this.dataSource.data = this.dataSource.data.filter(data => data.id !== id);
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

}
