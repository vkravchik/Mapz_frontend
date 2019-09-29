import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreHallComponent } from './genre-hall.component';

describe('GenreHallComponent', () => {
  let component: GenreHallComponent;
  let fixture: ComponentFixture<GenreHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
