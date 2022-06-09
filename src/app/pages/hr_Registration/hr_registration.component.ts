import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-hr_registration",
  templateUrl: "./hr_registration.component.html",
  styleUrls: ["./hr_registration.component.css"],

})
export class HrregistrationComponent implements OnInit {

  public showRegister = false;
  public showLogin = true;
  constructor() { }

  ngOnInit() {


  }

  showData() {
    let temp: any;
    temp = this.showRegister
    this.showRegister = this.showLogin;
    this.showLogin = temp;
  }

}
