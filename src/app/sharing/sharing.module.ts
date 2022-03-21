import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "src/assets/pipes/custom-date.pipe";
import { MatCardModule } from "@angular/material/card";
// import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [CustomDatePipe],
  exports: [CustomDatePipe, MatCardModule],
  imports: [CommonModule, MatCardModule],
})
export class SharingModule {}
