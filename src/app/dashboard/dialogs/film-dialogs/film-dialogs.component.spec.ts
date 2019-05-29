import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDialogsComponent } from './film-dialogs.component';

describe('FilmDialogsComponent', () => {
  let component: FilmDialogsComponent;
  let fixture: ComponentFixture<FilmDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
