import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
// import { SharedModule } from '../../shared/shared.module';
import { AffilateRegComponent } from "./affiliateReg/affilatereg.component";
import { AffilateComponent } from "./affiliate.component";
import { SharingModule } from "src/app/sharing/sharing.module";

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
  declarations: [AffilateRegComponent],
})
export class AffilateModule {}
