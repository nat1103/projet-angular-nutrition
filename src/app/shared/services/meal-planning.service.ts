import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as config from '../../../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class MealPlanningService {

  configUrl = config.config.apiUrl + '/mealplanner/generate';
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

  getMealPlanning(timeFrame: string, targetCalories: string, diet: string, exclude: string): any {
    if (diet != '') {
      diet = '&diet=' + diet;
    }
    if (exclude != '') {
      exclude = '&exclude=' + exclude;
    }
    /*return this.http.get(this.configUrl + '?timeFrame=' + timeFrame + '&targetCalories=' + targetCalories + diet + exclude + '&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );*/
      console.log(this.configUrl + '?timeFrame=' + timeFrame + '&targetCalories=' + targetCalories + diet + exclude + '&apiKey=' + this.apiKey)
  }

}
