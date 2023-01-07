import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as config from '../../../../assets/config/config';
import { MealPlanning } from './service-meal-planning';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MealPlanningService {

  configUrl = config.config.apiUrl + '/mealplanner/generate';
  apiKey = config.config.apiKey
  dbPath = '/mealPlannings'
  mealPlanning: AngularFirestoreCollection<MealPlanning> | undefined;


  constructor(private http: HttpClient, private db: AngularFirestore) { }

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
    return this.http.get(this.configUrl + '?timeFrame=' + timeFrame + '&targetCalories=' + targetCalories + diet + exclude + '&apiKey=' + this.apiKey)
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }

  getAllMealPlannings(): AngularFirestoreCollection<MealPlanning> {
    return this.db.collection(this.dbPath);
  }

  getMealOfUser(user: string) {
    return this.db.collection(this.dbPath).doc('users').collection(user).get();
  }

  createMealPlanning(mealPlanning: MealPlanning, user: string): any {
    mealPlanning.idDate = this.createDate();

    return this.db.collection(this.dbPath).doc('users').collection(user).doc('1').set(mealPlanning);
  }

  createDate() {
    let today = new Date
    var year = today.toLocaleString("default", { year: "numeric" });
    var month = today.toLocaleString("default", { month: "2-digit" });
    var day = today.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }
  updateMealPlanning(id: string, data: any ,idUser : string): Promise<void> {
    return this.db.collection(this.dbPath).doc('users').collection(idUser).doc(id).update(data);
  }

  deleteMealPlanning(id: string , idUser : string): Promise<void> {
    return this.db.collection(this.dbPath).doc('users').collection(idUser).doc(id).delete();
  }

  getMealPlanningById(id: string , idUser : string): Observable<any> {
    return this.db.collection(this.dbPath).doc('users').collection(idUser).doc(id).get();
  }

  getIdMealPlanning( idUser : string): any {
    this.db.collection(this.dbPath).doc('users').collection(idUser).get().forEach((doc) => {
       doc.docs[0].id;
    }).then((id) => {
      return id;
    });

  }

}
