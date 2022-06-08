import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-localization",
  templateUrl: "./localization.component.html",
  styleUrls: ["./localization.component.css"],
})
export class LocalizationComponent implements OnInit {
  public localisation: FormGroup;
  current_location: any;
  date_time: any;
  time_zone: any;
  symbol = "Rs";
  currency_code = "INR";
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );
    // this.date_time = this.time_zone.split("T");
    this.time_zone = this.current_location.timezone;
  }

  ngOnInit() {
    this.localisation = this.formBuilder.group({
      defaultCountry: [
        this.current_location.country_name,
        [Validators.required],
      ],
      dateFormat: ["dd-mm-yyyy", [Validators.required]],
      timeZone: [this.time_zone, [Validators.required]],
      deafultLanguage: ["English", [Validators.required]],
      currencyCode: [this.currency_code, [Validators.required]],
    });
  }

  submitLocalisation() {
    if (this.localisation.valid) {
      this.toastr.success("Localisation is added", "Success");
    }
  }
}
