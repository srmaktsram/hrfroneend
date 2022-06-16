import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharingModule } from "src/app/sharing/sharing.module";
import { ProfileComponent } from "./profile.component";

export const routes = [
  { path: "", component: ProfileComponent, pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharingModule,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
