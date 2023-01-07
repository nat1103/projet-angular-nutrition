import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as config from '../../../../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  configUrl = config.config.apiUrl + '/food/ingredients';
  apiKey = config.config.apiKey
  constructor(private http: HttpClient) { }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getIngredients(): Observable<any> {
    return this.http.get(this.configUrl + '/ingredients?apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  autocompleteIngredientsSearch(ingredient: string , ): Observable<any> {
    return this.http.get(this.configUrl + '/search?query=' + ingredient + '&number=5&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}
