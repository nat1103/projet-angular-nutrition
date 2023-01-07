import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { CardMenuRecipeComponent } from './card-menu-recipe/card-menu-recipe.component';
import { MenuRecipesComponent } from './menu-recipes/menu-recipes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MealPageComponent } from './meal/meal-page/meal-page.component';
import { MealTableComponent } from './meal/meal-table/meal-table.component';
import { MealDayComponent } from './meal/meal-day/meal-day.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { LoginComponent } from './component-about-user/login/login.component';
import firebase from 'firebase/compat/app';
import { RegisterComponent } from './component-about-user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RepasDetailsMealComponent } from './meal/repas-details-meal/repas-details-meal.component';


firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RecipeComponent,
    CardMenuRecipeComponent,
    MenuRecipesComponent,
    MealPageComponent,
    MealTableComponent,
    MealDayComponent,
    LoginComponent,
    RegisterComponent,
    RepasDetailsMealComponent,
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
