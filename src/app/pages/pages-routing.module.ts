
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HrregistrationComponent } from './hr_Registration/hr_registration.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';





const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "pricing", component: PricingComponent },
  { path: "home", component: HomeComponent },
  { path: "header", component: HeaderComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "products", component: ProductsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "hr_registration", component: HrregistrationComponent },
  {
    path: "affilate",
    loadChildren: () =>
      import("./affilate/affilate.module").then(
        (m) => m.AffilateModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
