import { Component , Input ,OnInit } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-meal-day',
  templateUrl: './meal-day.component.html',
  styleUrls: ['./meal-day.component.less']
})
export class MealDayComponent implements OnInit {
  @Input() day: any = {};
  image = '';
  constructor(private recipeService : RecipesService) { }

  ngOnInit() {
     this.recipeService.getInformationRecipe(this.day.id).subscribe(data => {
      this.image = data.image;
    });
  }
}
