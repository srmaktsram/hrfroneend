
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "pricing", component: PricingComponent },
  { path: "home", component: HomeComponent },
  { path: "header", component: HeaderComponent },
  { path: "checkout", component: CheckoutComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
