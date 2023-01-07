import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/services/recipeService/recipes.service';

@Component({
  selector: 'app-meal-day',
  templateUrl: './meal-day.component.html',
  styleUrls: ['./meal-day.component.less']
})
export class MealDayComponent implements OnInit {
  @Input() mealOfDay: any = {};
  @Input() day: string = '';
  image = '';
  timeOfDay = ['Morning', 'Afternoon', 'Evening'];
  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    /*this.recipeService.getInformationRecipe(this.day.id).subscribe(data => {
     this.image = data.image;
   });*/
    for (let i = 0; i < this.mealOfDay.meals.length; i++) {
      switch (i) {
        case 0:
          this.mealOfDay.meals[i].timeOfDay = this.timeOfDay[0];
          break;
        case 1:
          this.mealOfDay.meals[i].timeOfDay = this.timeOfDay[1];
          break;
        case 2:
          this.mealOfDay.meals[i].timeOfDay = this.timeOfDay[2];
          break;
        default:
          break;
      }

    }
    
  }
}
