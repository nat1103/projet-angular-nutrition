import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../shared/services/recipeService/recipes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {
  recipe: any = {};
  steps: any = [];
  essentialNutrients: any = [];
  equipments: any = {};
  id: string | null= '';
  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private http: HttpClient) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.recipesService.getInformationRecipe(this.id).subscribe((data: any) => {
      this.essentialNutrients = this.recipesService.returnEssentialNutrients(data);
    });
    
    this.recipesService.getInformationRecipe(this.id).subscribe((data: any) => {
      this.recipe = data;
    });
    this.recipesService.getRecipeInstructions(this.id).subscribe((data: any) => {
      this.steps = data[0].steps;
    });
  }

}
