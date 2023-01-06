import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../shared/services/recipes.service';
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
  equipments : any = {};
  constructor(private route: ActivatedRoute, private recipesService: RecipesService,private http: HttpClient) { }

  ngOnInit() {
    this.http.get('../../assets/object/object.json').subscribe(data => {
      this.recipe = data;
      console.log(data);
    });
    this.essentialNutrients = [
      {
        "name": "",
        "amount": 331.05,
        "unit": " kcal"
      },
      {
        "name": "Total Fat",
        "amount": 19.1,
        "unit": "g"
      },
      {
        "name": "Carbs",
        "amount": 14.82,
        "unit": "g"
      },
      {
        "name": "Protein",
        "amount": 28.81,
        "unit": "g"
      }
    ]

    this.equipments = {
      "equipment": [
          {
              "name": "mixing bowl",
              "image": "mixing-bowl.jpg"
          },
          {
              "name": "frying pan",
              "image": "pan.png"
          }
      ]
  }
    console.log(this.essentialNutrients);
    /*this.essentialNutrients = this.recipesService.getEssentialRecipeNutritients('1747701');
    let id = this.route.snapshot.paramMap.get('id');
    this.recipesService.getInformationRecipe(id).subscribe((data: any) => {
      this.recipe = data;
      console.log(this.recipe);
    });
    this.recipesService.getRecipeInstructions(id).subscribe((data: any) => {
      this.steps = data[0].steps;
      console.log(this.steps);
    });*/
  }

}
