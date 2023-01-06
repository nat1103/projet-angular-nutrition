import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecipesComponent } from './menu-recipes.component';

describe('MenuRecipesComponent', () => {
  let component: MenuRecipesComponent;
  let fixture: ComponentFixture<MenuRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
