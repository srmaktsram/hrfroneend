import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.css"],
})
export class PricingComponent implements OnInit {

  public dayFunction = true;
  public yearFunction = false
  public day: any;
  public year: any;
  public totalYearAmount: any;
  public totalDayAmount: any;
  constructor() { }

  ngOnInit() {

  }

  daySlab(event) {
    this.day = event;
    let oneDayAmount = (50 / 30)
    this.totalDayAmount = this.day * oneDayAmount
    console.log(this.totalDayAmount, "llllllllllll")
  }

  yearSlab(event) {
    this.year = event
    let oneYear = 600;
    this.totalYearAmount = this.year * oneYear
    console.log(this.totalYearAmount, "///////////////////////")

  }

}
