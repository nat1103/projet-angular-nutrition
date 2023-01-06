import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MenuRecipesComponent } from './menu-recipes/menu-recipes.component';
import { MealPageComponent } from './meal/meal-page/meal-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'menu-recipes', component : MenuRecipesComponent },
  { path: 'meal', component: MealPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
