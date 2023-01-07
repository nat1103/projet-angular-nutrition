import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MenuRecipesComponent } from './menu-recipes/menu-recipes.component';
import { MealPageComponent } from './meal/meal-page/meal-page.component';
import { LoginComponent } from './component-about-user/login/login.component';
import { RegisterComponent } from './component-about-user/register/register.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'menu-recipes', component : MenuRecipesComponent , canActivate: [AuthGuard]},
  { path: 'meal', component: MealPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
