import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceViewComponent } from './invoices/invoice-view/invoice-view.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
import { PaymentsComponent } from './payments/payments.component';


const routes: Routes = [
  {
    path:"",
    component:AccountsComponent,
    children:[
     
      
      {
        path:"invoices",
        component:InvoicesComponent
      },
      {
        path:"invoice-view",
        component:InvoiceViewComponent
      },
      {
        path:"create-invoice",
        component:CreateInvoiceComponent
      },
      {
        path:"edit-invoice",
        component:EditInvoiceComponent
      },
      {
        path:"payments",
        component:PaymentsComponent
      },
      
      {
        path:"provident-fund",
      },
      {
        path:"taxes",
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
