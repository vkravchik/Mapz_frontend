import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocomplete, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Film} from '../../../models/Film';
import {FilmService} from '../../../services/film.service';
import {GenreService} from '../../../services/genre.service';

@Component({
  selector: 'app-film-dialogs',
  templateUrl: './film-dialogs.component.html',
  styleUrls: ['./film-dialogs.component.scss']
})
export class FilmDialogsComponent implements OnInit {
  form: FormGroup;
  genre: any;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  private currentRow: Film;
  allGenres;

  constructor(private formBuilder: FormBuilder,
              private _film: FilmService,
              private _genres: GenreService,
              private dialogRef: MatDialogRef<FilmDialogsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    this._genres.getAll().subscribe(res => {
      this.allGenres = res;
    });
  }

  ngOnInit(): void {
    if (this.data.film) {
      this.genre = this.data.film.genre;
      console.log(this.genre);
      this.form = this.formBuilder.group({
        name: this.data.film.name || '',
        description: this.data.film.description,
        url: this.data.film.url,
        genre: this.data.film.genre,
        del: false,
      });
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      url: '',
      genre: '',
      del: false,
    });
  }

  stop(): void {
    if (!this.data.status) {
      this.form.value.id = this.data.film.id;
    }
    this._film.dialogData = this.form.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getSingle() {
    this._film.getSingle(this.data.id).subscribe((res: Film) => {
      this.currentRow = res;
      this.form.patchValue({});
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
}
