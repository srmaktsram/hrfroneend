import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PricingComponent } from './pricing.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,

  ]
})
export class PricingModule { }
