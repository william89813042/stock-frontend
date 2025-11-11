import {Injectable} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  concatMap,
  finalize,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {
    console.log('Loading service created ...');
  }


  /**加載指示器 */
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.show()),
      concatMap(() => obs$),
      finalize(() => this.hide())
    );
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
