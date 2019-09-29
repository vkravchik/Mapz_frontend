import {Component, OnInit, ViewChild} from '@angular/core';
import {GenreService} from '../../../services/genre.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {GenreHallComponent} from '../../dialogs/genre-hall/genre-hall.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _genre: GenreService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._genre.getAll().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(GenreHallComponent, {
      data: {namePlaceholder: 'Жанр'}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this._genre.add(this._genre.dialogData).subscribe(
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
    this._genre.delete(id).subscribe(
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
