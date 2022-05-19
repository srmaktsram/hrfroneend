import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "src/assets/pipes/custom-date.pipe";

import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateAgoPipe } from "src/assets/pipes/timeAgo";


// import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [CustomDatePipe,DateAgoPipe],
  exports: [
    CustomDatePipe,
    DateAgoPipe,
    MatCardModule,
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
