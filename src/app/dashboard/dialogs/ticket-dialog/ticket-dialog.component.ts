import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Hall} from '../../../models/Hall';
import {Film} from '../../../models/Film';
import {TicketService} from '../../../services/ticket.service';
import {FilmService} from '../../../services/film.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HallService} from '../../../services/hall.service';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {
  form: FormGroup;
  private currentRow: any;
  halls: Hall[];
  films: Film[];
  private selectedFilm: Film;
  private selectedHall: Hall;

  constructor(
              private _ticket: TicketService,
              private _film: FilmService,
              private _hall: HallService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<TicketDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      date: null,
      time: null,
      film: {
        id: null
      },
      hall: {
        id: null
      }
    });

    if (!this.data.status) {
      this.getSingle();
    }
    this.getFilms();
    this.getHalls();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stop(): void {
    this.form.patchValue({
      film: this.selectedFilm,
      hall: this.selectedHall,
    });
    if (!this.data.status) {
      this.form.value.id = this.data.id;
      console.log(this.form.value.id);
    }
    console.log(this.form.value);
    this._ticket.dialogData = this.form.value;
  }

  private getSingle() {
    this._ticket.getSingle(this.data.id).subscribe((res: any) => {
      this.currentRow = res;
      this.form.patchValue({
        date: res.date,
        time: res.time,
      });
    });
  }

  private getHalls() {
    this._hall.getAll().subscribe(res => {
      this.halls = res;
    });
  }

  private getFilms() {
    this._film.getAll().subscribe(res => {
      this.films = res;
    });
  }

  selectedFilms(event) {
    this._film.getSingle(event).subscribe(res => {
      this.selectedFilm = res;
    });
  }

  selectedHalls(event) {
    this._hall.getSingle(event).subscribe(res => {
      this.selectedHall = res;
      console.log(this.selectedHall);
    });
  }
}
