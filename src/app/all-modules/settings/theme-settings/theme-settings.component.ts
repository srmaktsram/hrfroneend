import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-theme-settings",
  templateUrl: "./theme-settings.component.html",
  styleUrls: ["./theme-settings.component.css"],
})
export class ThemeSettingsComponent implements OnInit {
  public themeSettings: FormGroup;
  images: any;
  id: any;
  cicon: any;
  clogo: any;
  companyLogo: string;
  companySite: string;
  user_type: string;
  settingsWrite: string;
  settingsWriteSub: string;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.settingsWrite = sessionStorage.getItem("settingsWrite");
    this.settingsWriteSub = sessionStorage.getItem("settingsWriteSub");
    this.id = sessionStorage.getItem("adminId");
    this.companyLogo = `http://localhost:8443/${sessionStorage.getItem(
      "clogo"
    )}`;
    this.companySite = sessionStorage.getItem("companySite");
  }

  ngOnInit() {
    this.themeSettings = this.formBuilder.group({
      websiteName: ["", [Validators.required]],
      lightLogo: [""],
    });
    this.themeSettings.patchValue({
      websiteName: sessionStorage.getItem("companySite"),
    });
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.clogo = file;
    }
  }

  submitThemeSettings() {
    if (this.themeSettings.valid) {
      let params = new HttpParams();
      params = params.set("companySite", this.themeSettings.value.websiteName);
      params = params.set("id", this.id);
      const formData = new FormData();
      formData.append("file", this.clogo);
      console.log(params);
      this.http
        .post(
          "http://localhost:8443/admin/themesetting/file?" + params,

          formData
        )
        .subscribe((res: any) => {
          console.log(res);
          if (res.result == 1) {
            sessionStorage.setItem("clogo", res.data.clogo);
            sessionStorage.setItem("companySite", res.data.companySite);
            window.location.reload();
          }
        });

      this.toastr.success("Theme settings is added", "Success");
    }
  }
}
