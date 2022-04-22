import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Bootstrap DataTable to open pull request
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LanguageInterceptor } from "./interceptors/language.interceptor";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
