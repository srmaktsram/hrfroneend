import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";
import { HrregistrationComponent } from "src/app/pages/hr_registration/hr_registration.component";
import { ShowregisterloginService } from "src/app/services/showregisterlogin.service";

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
  constructor(private hrUserAuthenticationService: HrUserAuthenticationService, public hrregistrationComponent: HrregistrationComponent,
    private route: ActivatedRoute,
    private router: Router, private hr_registrationS: ShowregisterloginService) { }

  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.user_type = sessionStorage.getItem("user_type");
    console.log(this.firstName, "console firstName from header component");
    this.visible()
    // this.hrregistrationComponent.showPage()
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
  showPage(value) {
    if (value === 'register') {
      this.hr_registrationS.showPage("signUp")
      this.router.navigate(["/hr_registration"])

    } else if (value === 'login') {
      this.router.navigate(["/hr_registration"]);
      this.hr_registrationS.showPage("signIn")


    }
  }
}
