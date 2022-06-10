import { Component, OnInit, HostListener, NgZone } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-affiliate-dashboard",
  templateUrl: "./affiliate-dashboard.component.html",
  styleUrls: ["./affiliate-dashboard.component.css"],
})
@HostListener("window: resize", ["$event"])
export class DashboardComponent implements OnInit {
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
    // this.router.navigateByUrl("/layout/dashboard/admin");
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }
}