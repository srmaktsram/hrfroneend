import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
// import { Data, AppService } from '../../app.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-affiliate",
  templateUrl: "./affiliate.component.html",
  styleUrls: ["./affiliate.component.scss"],
})
export class AffilateComponent implements OnInit {
  // @ViewChild(FormGroupDirective) myForm;
  @ViewChild("horizontalStepper", { static: true })
  horizontalStepper: MatStepper;
  @ViewChild("verticalStepper", { static: true }) verticalStepper: MatStepper;

  constructor(
    // public appService:AppService,
    private router: Router,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  navigateUrl() {
    this.router.navigate(["/affiliates/affiliate-registration"]);
  }
}
