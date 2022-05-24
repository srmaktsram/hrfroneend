import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SharingModule } from '../sharing/sharing.module';
import { HomeComponent } from './home/home.component';
import { PricingModule } from './pricing/pricing.module';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    PricingModule,
    PagesRoutingModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    SharingModule,
    MatButtonModule,
  ]
})
export class PagesModule { }
