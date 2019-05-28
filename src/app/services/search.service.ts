import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSource: Subject<string> = new Subject<string>();

  get search$(): Observable<string> {
    return this.searchSource.asObservable();
  }

  makeSearch(searchValue: string): void {
    this.searchSource.next(searchValue);
  }
}
