import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../shared/services/recipeService/recipes.service';
import { IngredientsService } from '../shared/services/serviceIngredient/ingredients.service';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-menu-recipes',
  templateUrl: './menu-recipes.component.html',
  styleUrls: ['./menu-recipes.component.less']
})
export class MenuRecipesComponent implements OnInit {
  ingredients: any = [];
  searchSuggestionsIngredientsRemove: any = [];
  requestStringForApi: any = '';
  recipes: any = [];
  offset: any = 0;
  sort: any = 'Protein';
  ArrayOfSortBy: any = ['Protein', 'Carbs', 'Fat', 'Calories'];
  ingredientsSelected: any = [];
  ingredientsSelectedRemove: any = [];
  isMenuOpen = false;
  isFilterOpen = false;
  innerWidth: any = 0;
  @ViewChild('searchInput') searchInput: ElementRef | any;
  @HostListener('window:resize', ['$event'])
  @ViewChild('buttonFilter') buttonFilter: ElementRef | any;
  
  
  onResize(event : any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 1024) {
      this.isFilterOpen = true;
    }
  }

  constructor(private ingredientsService: IngredientsService, private route: ActivatedRoute, private recipesService: RecipesService, private http: HttpClient, private renderer: Renderer2,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.searchInput != undefined) {
        if (e.target != this.searchInput.nativeElement) {
          this.isMenuOpen = false;
        }
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('addIngredient') != null) {
      this.ingredientsSelected = JSON.parse(localStorage.getItem('addIngredient') || '');
    }

    if (localStorage.getItem('removeIngredients') != null) {
      this.ingredientsSelectedRemove = JSON.parse(localStorage.getItem('removeIngredients') || '');
    }

    this.recipesService.getRecipesFromFilter('').subscribe(data => {
      this.recipes = data;
      
    });

    console.log(this.offset);
    console.log(this.recipes)

  }

  searchIngredient(event: any, isSearchWith: boolean) {
    this.isMenuOpen = true;
    this.ingredients = [];
    this.searchSuggestionsIngredientsRemove = [];
    this.ingredientsService.autocompleteIngredientsSearch(event.target.value).subscribe(data => {
      if (isSearchWith) {
        this.ingredients = data.results;
      } else {
        this.searchSuggestionsIngredientsRemove = data.results;
      }
    });
  }

  addIngredient(event: any) {
    if (localStorage.getItem('addIngredient') == null) {
      localStorage.setItem('addIngredient', JSON.stringify([]));
    } else {
      this.ingredientsSelected = JSON.parse(localStorage.getItem('addIngredient') || '');
    }
    this.ingredientsSelected.push(event.target.value);
    localStorage.setItem('addIngredient', JSON.stringify(this.ingredientsSelected));
    this.requestToAddOrRemoveIngredient();
  }

  removeFromAddIngredients(event: any) {
    if (localStorage.getItem('addIngredient') != null) {
      this.ingredientsSelected = JSON.parse(localStorage.getItem('addIngredient') || '');
      this.ingredientsSelected.splice(event.target.value, 1);
      localStorage.setItem('addIngredient', JSON.stringify(this.ingredientsSelected));
      this.requestToAddOrRemoveIngredient();
    }
  }



  addRemoveIngredient(event: any) {
    if (localStorage.getItem('removeIngredients') != null) {

      this.ingredientsSelectedRemove = JSON.parse(localStorage.getItem('removeIngredients') || '');

      this.ingredientsSelectedRemove.push(event.target.value);
      localStorage.setItem('removeIngredients', JSON.stringify(this.ingredientsSelectedRemove));
      this.requestToAddOrRemoveIngredient();
    } else {
      localStorage.setItem('removeIngredients', JSON.stringify([]));
    }
  }

  removeFromRemoveIngredients(event: any) {
    if (localStorage.getItem('removeIngredients') != null) {
      this.ingredientsSelectedRemove = JSON.parse(localStorage.getItem('removeIngredients') || '');
      this.ingredientsSelectedRemove.splice(event.target.value, 1);
      localStorage.setItem('removeIngredients', JSON.stringify(this.ingredientsSelectedRemove));
      this.requestToAddOrRemoveIngredient();
    }
  }

  checkIfLocalIsSet() {
    if (localStorage.getItem('addIngredient') != null) {
      this.ingredientsSelected = JSON.parse(localStorage.getItem('addIngredient') || '');
    }
    if (localStorage.getItem('removeIngredients') != null) {
      this.ingredientsSelectedRemove = JSON.parse(localStorage.getItem('removeIngredients') || '');
    }
  }


  requestToAddOrRemoveIngredient() {
    let requestToAddIngredient: string | null = '';
    let requestToRemoveIngredient: string | null = '';
    this.checkIfLocalIsSet();
    if (this.ingredientsSelected.length > 0) {
      requestToAddIngredient = 'includeIngredients=' + this.ingredientsSelected.join(',');
    }
    if (this.ingredientsSelectedRemove.length > 0) {
      requestToRemoveIngredient = 'excludeIngredients=' + this.ingredientsSelectedRemove.join(',');
    }
    if (requestToAddIngredient != null && requestToRemoveIngredient != null) {
      this.requestStringForApi = '&' + requestToAddIngredient + '&' + requestToRemoveIngredient
    } else if (requestToAddIngredient != null) {
      this.requestStringForApi = '&' + requestToAddIngredient
    } else if (requestToRemoveIngredient != null) {
      this.requestStringForApi = '&' + requestToRemoveIngredient
    }

    this.getRecipes();

  }

  sortBy(event: any) {
    this.sort = '&sort=' + event.target.value
    this.getRecipes();
  }

  nextPage() {
    this.offset = this.offset + 10;
    this.getRecipes();
    this.scrollToTop();
  }

  previousPage() {
    this.offset = this.offset - 10;
    this.getRecipes();
    this.scrollToTop();
  }

  lastPage() {
    this.offset = this.recipes.totalResults - 10
    this.getRecipes();
    this.scrollToTop();
  }

  firstPage() {
    this.offset = 0;
    this.getRecipes();
    this.scrollToTop();
  }

  getActivePage() {
    return Math.round(this.offset / 10 + 1);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.getRecipes();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  getRecipes() {
    this.recipesService.getRecipesFromFilter(this.requestStringForApi + this.sort + '&offset=' + this.offset).subscribe(data => {
      this.recipes = data;
    }
    );
  }

  displayFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  ngAfterViewInit() {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 436) {
        this.buttonFilter.nativeElement.style.position = 'fixed';
        this.buttonFilter.nativeElement.style.top = '80px';
      } else if (window.scrollY < 436) {
        this.buttonFilter.nativeElement.style.position = 'absolute';
        this.buttonFilter.nativeElement.style.top = '70vh';
      }
    });
  }
  
}
