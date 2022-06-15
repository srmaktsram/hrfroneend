import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],

})
export class HeaderComponent implements OnInit {

  public user_type: any;
  public firstName: any;
  constructor() { }

  ngOnInit() {

    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");

    console.log(this.firstName, "kjhdkjwehjwj>>>>>>>>>>>>>")

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
