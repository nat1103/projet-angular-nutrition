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
import { MealDayComponent } from './meal/meal-day/meal-day.component';;


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
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
