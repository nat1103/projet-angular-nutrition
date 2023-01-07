import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipeService/recipes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  recipes: any = [];
  constructor(private recipesService: RecipesService,) { }

  ngOnInit() {
  
    let dataRecipes: any = [];
    this.recipesService.getRandomRecipes().subscribe((data: []) => {

      dataRecipes = data;
      dataRecipes = dataRecipes.recipes;
      dataRecipes.forEach((recipe: any) => {
        this.recipes.push({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
        });
      })
    });

  }
}
