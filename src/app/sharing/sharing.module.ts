import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "src/assets/pipes/custom-date.pipe";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateAgoPipe } from "src/assets/pipes/timeAgo";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CustomDatePipe, DateAgoPipe],
  exports: [
    NgbModule,
    CustomDatePipe,
    DateAgoPipe,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
  ],
  imports: [
    NgbModule,
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule
  ],
})
export class SharingModule { }
