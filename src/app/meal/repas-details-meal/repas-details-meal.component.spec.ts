import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasDetailsMealComponent } from './repas-details-meal.component';

describe('RepasDetailsMealComponent', () => {
  let component: RepasDetailsMealComponent;
  let fixture: ComponentFixture<RepasDetailsMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepasDetailsMealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepasDetailsMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
