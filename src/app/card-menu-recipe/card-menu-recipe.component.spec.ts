import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMenuRecipeComponent } from './card-menu-recipe.component';

describe('CardMenuRecipeComponent', () => {
  let component: CardMenuRecipeComponent;
  let fixture: ComponentFixture<CardMenuRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMenuRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMenuRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
