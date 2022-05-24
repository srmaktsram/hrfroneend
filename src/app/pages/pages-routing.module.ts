import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "pricing", component: PricingComponent },
  { path: "home", component: HomeComponent },
  { path: "footer", component: FooterComponent },
  { path: "header", component: HeaderComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
