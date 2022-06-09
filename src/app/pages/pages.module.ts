import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SharingModule } from '../sharing/sharing.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { PricingComponent } from './pricing/pricing.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';
import { HrregistrationComponent } from './hr_Registration/hr_registration.component';



@NgModule({
  declarations: [HomeComponent, HeaderComponent, PricingComponent, FooterComponent, SidenavMenuComponent, PagesComponent, CheckoutComponent, ProfileComponent, ProductsComponent, HrregistrationComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SharingModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
export class PagesModule { }
