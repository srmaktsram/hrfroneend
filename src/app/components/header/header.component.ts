import { Component, OnInit, ViewChild } from "@angular/core";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";
import { HrregistrationComponent } from "src/app/pages/hr_registration/hr_registration.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [HrregistrationComponent]
})
export class HeaderComponent implements OnInit {
  public user_type: any;
  public firstName: any;
  public isShow = true;
  constructor(private hrUserAuthenticationService: HrUserAuthenticationService, private hrregistrationComponent: HrregistrationComponent) { }

  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");
    console.log(this.firstName, "kjhdkjwehjwj>>>>>>>>>>>>>");
    this.visible()

  }
  logout() {
    this.hrUserAuthenticationService.logout()
    window.location.replace("")
  }

  visible() {
    if (this.firstName) {

      this.isShow = false;

    }

  }
  showPage() {
    this.hrregistrationComponent.showPage()
  }

}
