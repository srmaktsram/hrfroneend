import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "src/assets/pipes/custom-date.pipe";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [CustomDatePipe],
  exports: [CustomDatePipe, MatCardModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  imports: [CommonModule, MatCardModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
})
export class SharingModule { }
