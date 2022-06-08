import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-email-settings",
  templateUrl: "./email-settings.component.html",
  styleUrls: ["./email-settings.component.css"],
})
export class EmailSettingsComponent implements OnInit {
  public adminId = sessionStorage.getItem("adminId");
  buttondisable = false;

  public emailSettings: FormGroup;
  emailSett: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getEmailSettings();
    this.emailSettings = this.formBuilder.group({
      mail: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      emailName: ["", [Validators.required]],
      smtpHost: ["", [Validators.required]],
      smtpUser: ["", [Validators.required]],
      smtpPassword: ["", [Validators.required]],
      smtpPort: ["", [Validators.required]],
      smtpSecurity: ["", [Validators.required]],
      smtpAuthentication: ["", [Validators.required]],
    });
  }

  submitEmailSettings() {
    if (this.emailSettings.valid) {
      let adminId = this.adminId;
      let obj = {
        mail: this.emailSettings.value.mail,
        emailAddress: this.emailSettings.value.emailAddress,
        emailName: this.emailSettings.value.emailName,
        smtpHost: this.emailSettings.value.smtpHost,
        smtpUser: this.emailSettings.value.smtpUser,
        smtpPassword: this.emailSettings.value.smtpPassword,
        smtpPort: this.emailSettings.value.smtpPort,
        smtpSecurity: this.emailSettings.value.smtpSecurity,
        smtpAuthentication: this.emailSettings.value.smtpAuthentication,
        adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/emailSettings/createEmailSettings",
          obj
        )
        .subscribe((data) => {
          this.getEmailSettings();
          this.buttondisable = false;
        });
      this.toastr.success("Email settings is added", "Success");
    }
  }
  getEmailSettings() {
    this.http
      .get(
        "http://localhost:8443/admin/emailSettings/getEmailSettings" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.emailSett = data;
        this.emailSettings.patchValue({
          mail: this.emailSett.mail,
          emailAddress: this.emailSett.emailAddress,
          emailName: this.emailSett.emailName,
          smtpHost: this.emailSett.smtpHost,
          smtpUser: this.emailSett.smtpUser,
          smtpPassword: this.emailSett.smtpPassword,
          smtpPort: this.emailSett.smtpPort,
          smtpSecurity: this.emailSett.smtpSecurity,
          smtpAuthentication: this.emailSett.smtpAuthentication,
        });
      });
  }
}
