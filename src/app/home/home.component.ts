import { Component } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  recipes: any = [];
  constructor(private recipesService: RecipesService,) { }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.recipes.push({
        id: i,
        title: 'Dizzy Busy and Hungry',
        image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg'
      });
    }
    /*let dataRecipes: any = [];
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
    });*/

  }
}
