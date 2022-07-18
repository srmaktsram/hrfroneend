import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HrUserAuthenticationService } from "src/app/core/storage/authentication-hruser.service";
@Component({
  selector: "app-products",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public registerForm: FormGroup;
  public changePassForm: FormGroup;
  isvalidconfirmpassword: boolean;
  public corporateId: any;
  public email: any;
  public editId: any;
  public details: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private hrUserAuthenticationService: HrUserAuthenticationService
  ) {}

  ngOnInit() {
    this.corporateId = sessionStorage.getItem("corporateId");
    this.registerForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
        ],
      ],
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: ["", [Validators.required]],
      address: [""],
      zipCode: [""],
    });

    this.getDetails();
    this.changePassForm = this.formBuilder.group({
      password: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  getDetails() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/getDetails" + "/" + this.corporateId
      )
      .subscribe((res: any) => {
        this.details = res.data;

        this.email = this.details[0].email;
        this.edit();
      });
  }

  updateData() {
    if (this.registerForm.valid) {
      let obj = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phone: this.registerForm.value.phone,
        gender: this.registerForm.value.gender,
        zipCode: this.registerForm.value.zipCode,
        address: this.registerForm.value.address,
      };

      this.http
        .patch(
          "http://localhost:8443/mainadmin/updateDetails" +
            "/" +
            this.corporateId,
          obj
        )
        .subscribe((res: any) => {
          this.router.navigate(["/pages/pricing"]);
          sessionStorage.setItem("firstName", res.data.firstName);
        });
    }
  }
  edit() {
    this.registerForm.patchValue({
      firstName: this.details[0].firstName,
      lastName: this.details[0].lastName,
      phone: this.details[0].phone,
      gender: this.details[0].gender,
      zipCode: this.details[0].zipCode,
      address: this.details[0].address,
    });
  }

  updatePassword() {
    let obj = {
      password: this.changePassForm.value.password,
      newPassword: this.changePassForm.value.newPassword,
      email: this.email,
    };
    console.log(obj);
    this.http
      .patch("http://localhost:8443/mainadmin/change/Password", obj)
      .subscribe((res: any) => {});
  }
}
