import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {
  public invoices: any ;
  public id;
  data: any;
  getdata: any;
  // public dtTrigger: Subject<any> = new Subject();
  constructor(
    private http:HttpClient,
    private router:Router,
    private route:ActivatedRoute
  ) {
    this.id= this.route.snapshot.queryParams["id"];
   
    this.getInvoice()
    this.getdata=[]
   }

  ngOnInit() {
   
  }
      getInvoice(){
        let id=this.id;
        this.http.get("http://localhost:8443/admin/invoices/getOneInvoices"+"/"+id).subscribe((res:any)=>{
          this.invoices=res.data;
          // console.log( this.invoices)
      // this.dtTrigger.next();
     
          
         this.getdata =this.invoices.items
          // console.log( this.invoices.project)
          
          
        })
      }
}
