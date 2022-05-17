import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "src/assets/pipes/custom-date.pipe";

import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'


// import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [CustomDatePipe],
  exports: [
    CustomDatePipe,

    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  imports: [
    CommonModule,

    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class SharingModule { }
