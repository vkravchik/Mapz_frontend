import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {GenreService} from '../../../services/genre.service';
import {ToastrService} from 'ngx-toastr';
import {GenreHallComponent} from '../../dialogs/genre-hall/genre-hall.component';
import {HallService} from '../../../services/hall.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _hall: HallService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._hall.getAll().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(GenreHallComponent, {
      data: {
        namePlaceholder: 'Зала',
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this._hall.add(this._hall.dialogData).subscribe(
          res => {
            this.dataSource.data.push(res);
            this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
          },
          (error) => {
            this.toastr.error(error);
          });
      }
    });
  }

  deleteItem(id) {
    this._hall.delete(id).subscribe(
      (res) => {
        if (res) {
          this.dataSource.data = this.dataSource.data.filter(data => data.id !== id);
        }
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

}
