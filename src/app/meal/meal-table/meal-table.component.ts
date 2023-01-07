import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meal-table',
  templateUrl: './meal-table.component.html',
  styleUrls: ['./meal-table.component.less']
})
export class MealTableComponent {
  @Input() meal: any = {};
  dayOfWeek: Array<string> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  constructor() { }

  ngOnInit() {
    console.log(this.meal)
  }
}
