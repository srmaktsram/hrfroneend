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
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./affiliateReg/dialog/dialog.component";
import { Dailog2Component } from "./affiliateReg/dailog2/dailog2.component";
import { Dailog3Component } from "./affiliateReg/dailog3/dailog3.component";
import { Dailog4Component } from "./affiliateReg/dailog4/dailog4.component";
import { Dailog5Component } from "./affiliateReg/dailog5/dailog5.component";

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

  constructor(public dialog: MatDialog,
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
  openDialog(){
    this.dialog.open(DialogComponent)
  }

  openDialog2(){
    this.dialog.open(Dailog2Component)
  }

  openDialog3(){
    this.dialog.open(Dailog3Component)
  }

  openDialog4(){
    this.dialog.open(Dailog4Component)
  }
  
  openDialog5(){
  this.dialog.open(Dailog5Component)
  }
}
