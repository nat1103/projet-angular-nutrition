import { Component, OnInit, Renderer2 } from '@angular/core';
import { MealPlanningService } from '../../shared/services/meal-planning.service';
import { ViewChild, ElementRef } from '@angular/core';
import { IngredientsService } from '../../shared/services/ingredients.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.less']
})


export class MealPageComponent implements OnInit {

 
  
  meal: any = {};
  searchSuggestionsIngredients: any = [];
  diets: Array<String> = ["No Diet", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];
  removeIngredient: any = [];
  isFilterOpen = true;
  innerWidth: any = 0;
  isMenuOpen: boolean = false;

  @HostListener('window:resize', ['$event'])
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> | any;
  @ViewChild('calories') calories: ElementRef | any;
  @ViewChild('diet') diet: ElementRef | any;
  

  constructor(private mealPlanningService: MealPlanningService, private renderer: Renderer2, private ingredientsService: IngredientsService,) {

  }


  displayFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  searchIngredient(event: any) {
    this.isMenuOpen = true;
    this.ingredientsService.autocompleteIngredientsSearch(event.target.value).subscribe(data => {
      this.searchSuggestionsIngredients = data.results;
    });
  }

  addRemoveIngredient(event: any) {
    this.isMenuOpen = false;
    this.removeIngredient.push(event.target.value);
  }

  onSubmit(event: any) {
    let ingredients = 'carotte,poireau';
    let calories = this.checkIsNumber(this.calories.nativeElement.value);
    let diet = this.diet.nativeElement.value;
    this.mealPlanningService.getMealPlanning('week', calories, diet, ingredients);
    /*this.mealPlanningService.getMealPlanning('day', calories, diet, ingredients).subscribe(data => {
      this.meal = data;
      console.log(data);
    }
    );*/

  }

  checkIsNumber(calories: string) {
    if (calories.match(/^[0-9]+$/) != null) {
      return '2000'
    } else {
      return calories
    }
  }
  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target != this.searchInput.nativeElement) {
        this.isMenuOpen = false;
        this.searchInput.reset();
      }
    });
    /*this.mealPlanningService.getMealPlanning('day', '2000', '', '').subscribe(data => {
      this.meal = data;
      console.log(data);
    }
  
    );*/

    this.meal = {
      "week": {
        "monday": {
          "meals": [
            {
              "id": 1697671,
              "imageType": "jpg",
              "title": "Sour Cream Coffee Cake",
              "readyInMinutes": 60,
              "servings": 12,
              "sourceUrl": "https://spoonacular.com/sour-cream-coffee-cake-1697671"
            },
            {
              "id": 1098387,
              "imageType": "jpg",
              "title": "Quinoa Salad with Barberries & Nuts",
              "readyInMinutes": 30,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/quinoa-salad-with-barberries-nuts-1098387"
            },
            {
              "id": 1098240,
              "imageType": "jpg",
              "title": "Lemon Fresh Spaghetti with Garden Sauce & Pumpkin Flowers",
              "readyInMinutes": 30,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/lemon-fresh-spaghetti-with-garden-sauce-pumpkin-flowers-1098240"
            }
          ],
          "nutrients": {
            "calories": 1890.88,
            "protein": 54.55,
            "fat": 69.75,
            "carbohydrates": 264.19
          }
        },
        "tuesday": {
          "meals": [
            {
              "id": 1697721,
              "imageType": "jpg",
              "title": "Strawberry Shortcake Waffles",
              "readyInMinutes": 7,
              "servings": 1,
              "sourceUrl": "https://spoonacular.com/strawberry-shortcake-waffles-1697721"
            },
            {
              "id": 157089,
              "imageType": "jpg",
              "title": "5 Ingredient High Protein Pumpkin Pancakes",
              "readyInMinutes": 15,
              "servings": 1,
              "sourceUrl": "https://spoonacular.com/5-ingredient-high-protein-pumpkin-pancakes-157089"
            },
            {
              "id": 642125,
              "imageType": "jpg",
              "title": "Easy Thai Fried Rice",
              "readyInMinutes": 45,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/easy-thai-fried-rice-642125"
            }
          ],
          "nutrients": {
            "calories": 1845.63,
            "protein": 44.81,
            "fat": 71.44,
            "carbohydrates": 256.63
          }
        },
        "wednesday": {
          "meals": [
            {
              "id": 1100990,
              "imageType": "jpg",
              "title": "Blueberry, Chocolate & Cocao Superfood Pancakes - Gluten-Free/Paleo/Vegan",
              "readyInMinutes": 30,
              "servings": 2,
              "sourceUrl": "https://spoonacular.com/blueberry-chocolate-cocao-superfood-pancakes-gluten-free-paleo-vegan-1100990"
            },
            {
              "id": 715769,
              "imageType": "jpg",
              "title": "Broccolini Quinoa Pilaf",
              "readyInMinutes": 30,
              "servings": 2,
              "sourceUrl": "https://spoonacular.com/broccolini-quinoa-pilaf-715769"
            },
            {
              "id": 654009,
              "imageType": "jpg",
              "title": "Orecchiette With Sun-Dried and Fresh Cherry Tomatoes",
              "readyInMinutes": 45,
              "servings": 2,
              "sourceUrl": "https://spoonacular.com/orecchiette-with-sun-dried-and-fresh-cherry-tomatoes-654009"
            }
          ],
          "nutrients": {
            "calories": 1813.89,
            "protein": 50.45,
            "fat": 68.07,
            "carbohydrates": 258.4
          }
        },
        "thursday": {
          "meals": [
            {
              "id": 1697721,
              "imageType": "jpg",
              "title": "Strawberry Shortcake Waffles",
              "readyInMinutes": 7,
              "servings": 1,
              "sourceUrl": "https://spoonacular.com/strawberry-shortcake-waffles-1697721"
            },
            {
              "id": 642585,
              "imageType": "jpg",
              "title": "Farfalle with fresh tomatoes, basil and mozzarella",
              "readyInMinutes": 15,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/farfalle-with-fresh-tomatoes-basil-and-mozzarella-642585"
            },
            {
              "id": 636714,
              "imageType": "jpg",
              "title": "Cajun Cuisine: Vegan Jambalaya",
              "readyInMinutes": 45,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/cajun-cuisine-vegan-jambalaya-636714"
            }
          ],
          "nutrients": {
            "calories": 1991.58,
            "protein": 43.65,
            "fat": 74.99,
            "carbohydrates": 289.96
          }
        },
        "friday": {
          "meals": [
            {
              "id": 640965,
              "imageType": "jpg",
              "title": "Crushed Lentil Soup- Granola Style",
              "readyInMinutes": 45,
              "servings": 1,
              "sourceUrl": "https://spoonacular.com/crushed-lentil-soup-granola-style-640965"
            },
            {
              "id": 642585,
              "imageType": "jpg",
              "title": "Farfalle with fresh tomatoes, basil and mozzarella",
              "readyInMinutes": 15,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/farfalle-with-fresh-tomatoes-basil-and-mozzarella-642585"
            },
            {
              "id": 658269,
              "imageType": "jpg",
              "title": "Rice noodle salad with sesame oil dressing",
              "readyInMinutes": 45,
              "servings": 3,
              "sourceUrl": "https://spoonacular.com/rice-noodle-salad-with-sesame-oil-dressing-658269"
            }
          ],
          "nutrients": {
            "calories": 1849.06,
            "protein": 46.52,
            "fat": 72.94,
            "carbohydrates": 254.31
          }
        },
        "saturday": {
          "meals": [
            {
              "id": 641047,
              "imageType": "jpg",
              "title": "Curious George's Gluten-Free Banana Nut Bread",
              "readyInMinutes": 45,
              "servings": 8,
              "sourceUrl": "https://spoonacular.com/curious-georges-gluten-free-banana-nut-bread-641047"
            },
            {
              "id": 642593,
              "imageType": "jpg",
              "title": "Farfalle With Sun-Dried Tomato Pesto, Sausage and Fennel",
              "readyInMinutes": 20,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/farfalle-with-sun-dried-tomato-pesto-sausage-and-fennel-642593"
            },
            {
              "id": 646051,
              "imageType": "jpg",
              "title": "Gulasch",
              "readyInMinutes": 45,
              "servings": 3,
              "sourceUrl": "https://spoonacular.com/gulasch-646051"
            }
          ],
          "nutrients": {
            "calories": 1781.95,
            "protein": 55.85,
            "fat": 63.76,
            "carbohydrates": 255.29
          }
        },
        "sunday": {
          "meals": [
            {
              "id": 640965,
              "imageType": "jpg",
              "title": "Crushed Lentil Soup- Granola Style",
              "readyInMinutes": 45,
              "servings": 1,
              "sourceUrl": "https://spoonacular.com/crushed-lentil-soup-granola-style-640965"
            },
            {
              "id": 643674,
              "imageType": "jpg",
              "title": "Fried Brown Rice",
              "readyInMinutes": 25,
              "servings": 2,
              "sourceUrl": "https://spoonacular.com/fried-brown-rice-643674"
            },
            {
              "id": 650126,
              "imageType": "jpg",
              "title": "Linguine E Americana",
              "readyInMinutes": 45,
              "servings": 4,
              "sourceUrl": "https://spoonacular.com/linguine-e-americana-650126"
            }
          ],
          "nutrients": {
            "calories": 1923.62,
            "protein": 55.03,
            "fat": 66.33,
            "carbohydrates": 281.39
          }
        }
      }
    }

  }

}


