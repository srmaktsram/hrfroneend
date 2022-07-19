import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-salary-settings",
  templateUrl: "./salary-settings.component.html",
  styleUrls: ["./salary-settings.component.css"],
})
export class SalarySettingsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public salarySettings: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.salarySettings = this.formBuilder.group({
      da: ["", [Validators.required]],
      hra: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
      esiEmployeeShare: ["", [Validators.required]],
      esiOrganisationShare: ["", [Validators.required]],
      annualSalaryFrom1: ["", [Validators.required]],
      annualSalaryTo1: ["", [Validators.required]],
      annualpercentage1: ["", [Validators.required]],
      annualSalaryFrom2: ["", [Validators.required]],
      annualSalaryTo2: ["", [Validators.required]],
      annualpercentage2: ["", [Validators.required]],
    });
  }

  submitSalarySettings() {
    if (this.salarySettings.valid) {
      this._snackBar.open("Salary settings  added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
