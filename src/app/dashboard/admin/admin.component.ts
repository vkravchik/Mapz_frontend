import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FilmService} from '../../services/film.service';
import {Router} from '@angular/router';
import {FilmDialogsComponent} from '../dialogs/film-dialogs/film-dialogs.component';
import {AlertService} from '../../services/alert.service';
import {Film} from '../../models/Film';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'description', 'genres', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private _film: FilmService,
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
    this._film.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log(res);
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(FilmDialogsComponent, {
      data: {status: 1}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this._film.add(this._film.dialogData).subscribe(
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

  startEdit(id) {
    const dialogRef = this.dialog.open(FilmDialogsComponent, {
      data: {id: id, status: 0}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this._film.update(this._film.dialogData).subscribe((res: any) => {
            const foundIndex = this.dataSource.data.findIndex(x => x.id === res.id);
            this.dataSource.data[foundIndex] = res;

            this.dataSource = new MatTableDataSource<any>(this.dataSource.data);

          },
          (error) => {
            this.alert.error(error);
          });
      }
    });
  }

  deleteItem(id) {
    this._film.delete(id).subscribe(
      (res) => {
        this.dataSource.data = this.dataSource.data.filter(data => data.id !== id);
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

}
