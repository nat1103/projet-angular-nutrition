import { Component, OnInit, Renderer2 } from '@angular/core';
import { MealPlanningService } from '../../shared/services/serviceMealPlanning/meal-planning.service';
import { ViewChild, ElementRef } from '@angular/core';
import { IngredientsService } from '../../shared/services/serviceIngredient/ingredients.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.less']
})


export class MealPageComponent implements OnInit {

  displayFilter: boolean = false;
  mealIsLoaded: Promise<boolean> = Promise.resolve(false);
  meal: any = [];
  searchSuggestionsIngredients: any = [];
  diets: Array<String> = ["No Diet", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];
  removeIngredients: any = [];
  isFilterOpen = true;
  innerWidth: any = 0;
  isMenuOpen: boolean = false;
  MondayOfWeek: any = new Date();

  @HostListener('window:resize', ['$event'])
  @ViewChild('searchInput') searchInput: ElementRef | any;
  @ViewChild('calories') calories: ElementRef | any;
  @ViewChild('diet') diet: ElementRef | any;
  @ViewChild('buttonCreateMealPlanning') buttonCreateMealPlanning: ElementRef | any;


  constructor(private mealPlanningService: MealPlanningService, private renderer: Renderer2, private ingredientsService: IngredientsService,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.searchInput != undefined) {
        if (e.target != this.searchInput.nativeElement) {
          this.isMenuOpen = false;
        }
      }
    });
  }

  getTheMondayOfWeek(today: any = new Date()) {
    let day = today.getDay();
    let diff = today.getDate() - day + (day == 0 ? -6 : 1);
    let dateDiff = new Date(today.setDate(diff));
    var fmYear = dateDiff.toLocaleString("default", { year: "numeric" });
    var fmMonth = dateDiff.toLocaleString("default", { month: "2-digit" });
    var fmDay = dateDiff.toLocaleString("default", { day: "2-digit" });
    var formattedDate = fmYear + "-" + fmMonth + "-" + fmDay;
    return formattedDate;
  }

  display() {
    this.displayFilter = !this.displayFilter;
  }

  searchIngredient(event: any) {
    this.isMenuOpen = true;
    this.ingredientsService.autocompleteIngredientsSearch(event.target.value).subscribe(data => {
      this.searchSuggestionsIngredients = data.results;
    });
  }

  addRemoveIngredient(event: any) {
    this.isMenuOpen = false;
    this.removeIngredients.push(event.target.value);
  }

  onSubmit(event: any) {
    let ingredients = ' ';
    let calories = this.checkIsNumber(this.calories.nativeElement.value);
    let diet = this.diet.nativeElement.value;
    this.mealPlanningService.getMealPlanning('week', calories, diet, ingredients).subscribe((data: any) => {
      this.meal['1'] = data;
      this.saveMealPlan();
      this.mealIsLoaded = Promise.resolve(true);
      console.log(this.meal)
    }
    );

  }

  checkIsNumber(calories: string) {
    if (calories.match(/^[0-9]+$/) != null) {
      return '2000'
    } else {
      return calories
    }
  }

  saveMealPlan() {
    if (localStorage.getItem('user') != null) {
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.meal)
      this.mealPlanningService.createMealPlanning(this.meal[0] ,user.uid);
    
    }
  }

  getTheMealOfTheWeek() {
    return this.meal.filter((element: any) => element.idDate == this.MondayOfWeek);
  }

  getAllMealPlanOfUser() {
    let uid = JSON.parse(localStorage.getItem('user') || '{}').uid;
    this.mealPlanningService.getMealOfUser(uid).subscribe(data => {
      data.forEach((element: any) => {
        this.meal.push(element.data());
        this.mealIsLoaded = Promise.resolve(true);
      });
    });
  }
  ngOnInit(): void {
    console.log(this.getTheMondayOfWeek(new Date()));
    this.getAllMealPlanOfUser();

  }


  ngAfterViewInit() {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 436) {
        this.buttonCreateMealPlanning.nativeElement.style.position = 'fixed';
        this.buttonCreateMealPlanning.nativeElement.style.top = '80px';
      } else if (window.scrollY < 436) {
        this.buttonCreateMealPlanning.nativeElement.style.position = 'absolute';
        this.buttonCreateMealPlanning.nativeElement.style.top = '70vh';
      }
    });
  }

  removeFromIngredients(event: any, ingredients: any) {
    this.removeIngredients.splice(this.removeIngredients.indexOf(ingredients), 1);
  }
}


