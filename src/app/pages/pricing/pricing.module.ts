import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharingModule } from "src/app/sharing/sharing.module";
import { PricingComponent } from "./pricing.component";

export const routes = [
  { path: "", component: PricingComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharingModule,
  ],
  declarations: [PricingComponent],
})
export class PricingModule {}
