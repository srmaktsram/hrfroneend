import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AffilateRegComponent } from "./affiliateReg/affilatereg.component";
import { AffilateComponent } from "./affiliate.component";
import { SharingModule } from "src/app/sharing/sharing.module";
import { DialogComponent } from './affiliateReg/dialog/dialog.component';
import { Dailog2Component } from './affiliateReg/dailog2/dailog2.component';
import { Dailog3Component } from './affiliateReg/dailog3/dailog3.component';
import { Dailog4Component } from './affiliateReg/dailog4/dailog4.component';
import { Dailog5Component } from './affiliateReg/dailog5/dailog5.component';

export const routes = [
  { path: "", component: AffilateComponent, pathMatch: "full" },
  { path: "affiliate-registration", component: AffilateRegComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharingModule,
  ],
  declarations: [AffilateRegComponent, AffilateComponent, DialogComponent, Dailog2Component, Dailog3Component, Dailog4Component, Dailog5Component],
})
export class AffilateModule { }
