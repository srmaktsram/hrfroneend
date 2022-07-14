import {
  Component,
  OnInit,
  HostListener,
  NgZone,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-main-dashboard",
  templateUrl: "./main-dashboard.component.html",
  styleUrls: ["./main-dashboard.component.css"],
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

  ngOnInit() {}

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }
}
