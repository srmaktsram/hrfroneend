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
  time_zone = "2022-04-14T15:56:16+05:30";
  symbol = "Rs";
  currency_code = "INR";
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );
    this.date_time = this.time_zone.split("T");
  }

  ngOnInit() {
    this.localisation = this.formBuilder.group({
      defaultCountry: [
        this.current_location.country_name,
        [Validators.required],
      ],
      dateFormat: [this.date_time[0], [Validators.required]],
      timeZone: [this.date_time[1], [Validators.required]],
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
