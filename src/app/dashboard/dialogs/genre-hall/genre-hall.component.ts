import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GenreService} from '../../../services/genre.service';
import {HallService} from '../../../services/hall.service';

@Component({
  selector: 'app-genre-hall',
  templateUrl: './genre-hall.component.html',
  styleUrls: ['./genre-hall.component.scss']
})
export class GenreHallComponent implements OnInit {
  form: FormGroup;
  namePlaceholder: string;

  constructor(private _genre: GenreService,
              private _hall: HallService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<GenreHallComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.namePlaceholder = this.data.namePlaceholder;
    this.form = this.formBuilder.group({
      name: null,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stop(): void {
    if (this.data.namePlaceholder === 'Жанр') {
      this._genre.dialogData = this.form.value;
    } else {
      this._hall.dialogData = this.form.value;
    }
  }

}
