import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit {

  public firstName: any
  public user_type: any;
  constructor() { }

  ngOnInit() {

    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");

    console.log(this.firstName, "kjhdkjwehjwj>>>>>>>>>>>>>");

  }
  logout() {
    sessionStorage.removeItem("currentHrUserLgn");
    sessionStorage.removeItem("corporateId");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("hrUserId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    // window.location.reload();
  }

}