import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClientAuthenticationService } from "src/app/core/storage/authentication-client.service";

@Component({
  selector: "app-clientlogin",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class ClientLoginComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  public form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    // private storage: WebStorage,
    private http: HttpClient,
    private router: Router,
    private clientAuthenticationService: ClientAuthenticationService
  ) {}

  ngOnInit() {}
  sendTo() {
    this.router.navigate(["/login/forgot"], {
      queryParams: {
        loginType: "client",
      },
      skipLocationChange: true,
    });
  }
  submit() {
    let username = this.form.value.username;
    let password = this.form.value.password;

    this.http
      .post("http://localhost:8443/auth/clientlogin/login", {
        username,
        password,
      })
      .subscribe((res: any) => {
        console.log(res, "hhhhhhhhhhhhhhhhh");
        let client = res.data;
        if (res.result == 2) {
          console.log(client.id);
          console.log(client.adminId);
          this.clientAuthenticationService.login(client.id, client.adminId);
          this.router.navigate(["/layout/client/client-dashboard"]);
        } else {
          alert("wrong Id or pass");
        }
      });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
