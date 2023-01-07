import { Component, Input ,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repas-details-meal',
  templateUrl: './repas-details-meal.component.html',
  styleUrls: ['./repas-details-meal.component.less']
})
export class RepasDetailsMealComponent implements OnInit {

  @Input() repas: any = {};

  constructor() { }

  ngOnInit() {
  }
}
