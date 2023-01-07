import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as config from '../../../../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {


  configUrl = config.config.apiUrl + '/recipes';
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

  getRandomRecipes(): Observable<any> {
    return this.http.get(this.configUrl + '/random?number=5&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getInformationRecipe(id: string | null): Observable<any> {
    return this.http.get(this.configUrl + '/' + id + '/information?includeNutrition=true&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getRecipeInstructions(id: string | null): Observable<any> {
    return this.http.get(this.configUrl + '/' + id + '/analyzedInstructions?apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getEssentialRecipeNutritients(id: string | null): Array<any> {
    let Essentielnutrients: Array<any> = [];
    this.getInformationRecipe(id).subscribe((data: any) => {
      Essentielnutrients = this.returnEssentialNutrients(data);
    });
    return Essentielnutrients;
  }


  getRecipeEquipment(id: string | null): Observable<any> {
    return this.http.get(this.configUrl + '/' + id + '/equipmentWidget.json?apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getRecipesInformationBulk(ids: Array<string>): Observable<any> {
    return this.http.get(this.configUrl + '/informationBulk?ids=' + ids + '&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
 

  getRecipesFromFilter(filter: string): Observable<any> {
    return this.http.get(this.configUrl + '/complexSearch?addRecipeInformation=true&addRecipeNutrition=true' + filter + '&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


  returnEssentialNutrients(data : any): Array<any> {
    let Essentielnutrients: Array<any> = [];
    data.nutrition.nutrients.forEach((nutrients: { name: string; amount: string; unit: string }) => {
      if (nutrients.name == 'Calories' || nutrients.name == 'Fat' || nutrients.name == 'Carbohydrates' || nutrients.name == 'Protein') {
        switch (nutrients.name) {
          case 'Calories':
            nutrients.unit = ' kcal';
            nutrients.name = '';
            break;
          case 'Fat':
            nutrients.name = 'Total Fat';
            break;
          case 'Carbohydrates':
            nutrients.name = 'Carbs';
            break;
          default:
            break;
        }
        Essentielnutrients.push({
          name: nutrients.name,
          amount: nutrients.amount,
          unit: nutrients.unit
        });
      }
    });
    return Essentielnutrients;
  }

 
}
