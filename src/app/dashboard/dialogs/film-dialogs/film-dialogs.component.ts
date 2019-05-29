import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {Film} from '../../../models/Film';
import {FilmService} from '../../../services/film.service';
import {GenreService} from '../../../services/genre.service';
import {Genre} from '../../../models/Genre';
import {forEach} from '@angular/router/src/utils/collection';
import {nextTick} from 'q';

@Component({
  selector: 'app-film-dialogs',
  templateUrl: './film-dialogs.component.html',
  styleUrls: ['./film-dialogs.component.scss']
})
export class FilmDialogsComponent implements OnInit {
  visible = true;
  form: FormGroup;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];

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
      res.forEach(item => {
        this.allFruits.push(item.name);
      });
      this.allGenres = res;
    });

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.form.controls['genres'].push(this.buildGenres(event.option.value));
    console.log(this.form.value);
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: null,
      name: null,
      description: null,
      url: null,
      genres: this.formBuilder.array([]),
    });
  }

  buildGenres(value): FormGroup {
    return this.formBuilder.group({
      id: value,
    });
  }

  stop(): void {
    if (!this.data.status) {
      this.form.value.id = this.data.id;
      console.log(this.form.value.id);
    }
    this._film.dialogData = this.form.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getSingle() {
    this._film.getSingle(this.data.id).subscribe((res: Film) => {
      this.currentRow = res;
      this.form.patchValue({

      });
    });
  }

}
