import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],

})
export class HeaderComponent implements OnInit {
  // public show1 = false;
  // public show2 = true;
  public user_type: any;
  public firstName: any;
  constructor() { }

  ngOnInit() {

    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");

    console.log(this.firstName, "kjhdkjwehjwj>>>>>>>>>>>>>")

  }

}
