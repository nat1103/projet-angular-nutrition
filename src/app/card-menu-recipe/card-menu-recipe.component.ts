import { Component, Input ,OnInit} from '@angular/core';
import { RecipesService } from '../shared/services/recipeService/recipes.service';
@Component({
  selector: 'app-card-menu-recipe',
  templateUrl: './card-menu-recipe.component.html',
  styleUrls: ['./card-menu-recipe.component.less']
})
export class CardMenuRecipeComponent implements OnInit{
  @Input() recipe: any = {};
  essentialNutrients: any = [];
  constructor(private recipeService : RecipesService ) { }

  ngOnInit() {
    this.essentialNutrients = this.recipeService.returnEssentialNutrients(this.recipe);
    this.recipe.pricePerServing = (this.recipe.pricePerServing/100).toFixed(2);


  }
}
