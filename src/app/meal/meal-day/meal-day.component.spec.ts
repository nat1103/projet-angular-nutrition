import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDayComponent } from './meal-day.component';

describe('MealDayComponent', () => {
  let component: MealDayComponent;
  let fixture: ComponentFixture<MealDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
