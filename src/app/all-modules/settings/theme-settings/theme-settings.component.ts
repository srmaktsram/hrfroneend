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
  selector: "app-theme-settings",
  templateUrl: "./theme-settings.component.html",
  styleUrls: ["./theme-settings.component.css"],
})
export class ThemeSettingsComponent implements OnInit {
  public themeSettings: FormGroup;
  images: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.themeSettings = this.formBuilder.group({
      websiteName: ["Dreamguy's Technologies", [Validators.required]],
      lightLogo: [""],
      favicon: [""],
    });
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  submitThemeSettings() {
    if (this.themeSettings.valid) {
      const formData = new FormData();
      formData.append("file", this.images);
      console.log(formData, this.images);
      this.http
        .post("http://localhost:8443/admin/themesetting/file", formData)
        .subscribe((res) => {
          console.log("backend", res);
        });
      this.http
        .get("http://localhost:8443/admin/themesetting/getimg")
        .subscribe((res) => {
          console.log("backend", res);
        });

      this.toastr.success("Theme settings is added", "Success");
    }
  }
}
