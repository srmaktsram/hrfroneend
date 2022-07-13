import { Component, OnInit, HostListener, NgZone, ViewChild, ElementRef } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.css"],
})
@HostListener("window: resize", ["$event"])
export class DashboardComponent implements OnInit {

  @ViewChild('hrHand', { static: false }) hrHand: ElementRef;
  @ViewChild('minHand', { static: false }) minHand: ElementRef;
  @ViewChild('secHand', { static: false }) secHand: ElementRef;

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + "px";
  }

  constructor(private ngZone: NgZone, private router: Router) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + "px";
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {


    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
    }, 1000)
  }


  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }




  updateClock(date) {
    this.secHand.nativeElement.style.transform = 'rotate('
      + date.getSeconds() * 6 + 'deg)'

    this.minHand.nativeElement.style.transform = 'rotate('
      + date.getMinutes() * 6 + 'deg)'

    this.hrHand.nativeElement.style.transform = 'rotate('
      + (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)'

  }

}
