import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// import { ExportAsModule } from 'ngx-export-as';

import { AllModulesRoutingModule } from "./all-modules-routing.module";
import { AllModulesComponent } from "./all-modules.component";
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";


import {

  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from "ngx-perfect-scrollbar";
import { HeaderService } from "../header/header.service";
import { AllModulesService } from "./all-modules.service";
import { SharingModule } from "../sharing/sharing.module";

// Api All Modules Database


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [AllModulesComponent, HeaderComponent, SidebarComponent],
  imports: [
    SharingModule,
    CommonModule,
    FormsModule,
    // ExportAsModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(AllModulesData),
    PerfectScrollbarModule,
    AllModulesRoutingModule,
  ],
  providers: [
    AllModulesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    HeaderService,
  ],
})
export class AllModulesModule { }
