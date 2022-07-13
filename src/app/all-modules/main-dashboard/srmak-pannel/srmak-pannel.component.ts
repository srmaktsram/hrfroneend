import { Component, OnInit, HostListener, NgZone, ViewChild, ElementRef } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-srmak-pannel",
  templateUrl: "./srmak-pannel.component.html",
  styleUrls: ["./srmak-pannel.component.css"],
})
@HostListener("window: resize", ["$event"])
export class SrmakPannelComponent implements OnInit {
  public user_type: any;

  @ViewChild('hrHand', { static: false }) hrHand: ElementRef;
  @ViewChild('minHand', { static: false }) minHand: ElementRef;
  @ViewChild('secHand', { static: false }) secHand: ElementRef;

  public innerHeight: any;

  constructor(private ngZone: NgZone, private router: Router) {
  }

  ngOnInit() {

    this.user_type = sessionStorage.getItem("user_type");
    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
    }, 1000)

    // this.router.navigateByUrl("/layout/dashboard/admin");
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
