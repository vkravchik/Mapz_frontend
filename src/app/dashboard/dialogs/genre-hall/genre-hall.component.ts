import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GenreService} from '../../../services/genre.service';

@Component({
  selector: 'app-genre-hall',
  templateUrl: './genre-hall.component.html',
  styleUrls: ['./genre-hall.component.scss']
})
export class GenreHallComponent implements OnInit {
  form: FormGroup;
  namePlaceholder: string;

  constructor(private _genre: GenreService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<GenreHallComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this.data.namePlaceholder = this.namePlaceholder;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: null,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stop(): void {
    this._genre.dialogData = this.form.value;
  }

}
