import { Component, OnInit } from "@angular/core";
import { HrUserAuthenticationService } from "../core/storage/authentication-hruser.service";
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit {
  public isShow = true;
  public firstName: any;
  public user_type: any;
  constructor(
    private hrUserAuthenticationService: HrUserAuthenticationService
  ) {}

  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");


    this.visible();
  }

  logout() {
    this.hrUserAuthenticationService.logout();
    window.location.replace("");
  }

  visible() {
    if (this.firstName) {
      this.isShow = false;
    }
  }
}
