import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountsComponent } from "./accounts.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { InvoiceViewComponent } from "./invoices/invoice-view/invoice-view.component";
import { CreateInvoiceComponent } from "./invoices/create-invoice/create-invoice.component";
import { EditInvoiceComponent } from "./invoices/edit-invoice/edit-invoice.component";
import { PaymentsComponent } from "./payments/payments.component";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SharingModule } from "src/app/sharing/sharing.module";

@NgModule({
  declarations: [
    AccountsComponent,
    InvoicesComponent,
    InvoiceViewComponent,
    CreateInvoiceComponent,
    EditInvoiceComponent,
    PaymentsComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ],
})
export class AccountsModule {}
