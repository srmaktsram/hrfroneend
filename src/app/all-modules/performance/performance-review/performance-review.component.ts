import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent implements OnInit {
  user_type: string;
  performancewriteHr: string;

  constructor() { 
    this.user_type = sessionStorage.getItem("user_type");
    this.performancewriteHr = sessionStorage.getItem("performancewriteHr");
  }

  ngOnInit() {
  }

}
