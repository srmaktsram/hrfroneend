import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Subject } from "rxjs";

@Component({
  selector: "app-invoice-view",
  templateUrl: "./invoice-view.component.html",
  styleUrls: ["./invoice-view.component.css"],
})
export class InvoiceViewComponent implements OnInit {
  public invoices: any;
  public id;
  public path;
 
  data: any;
  getdata: any;
  
  companyInvoiceLogo: string;
  // public dtTrigger: Subject<any> = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {

      
    this.companyInvoiceLogo = 
    `http://localhost:8443/${sessionStorage.getItem(
      "cinvoice"
    )}`;
    this.path=this.companyInvoiceLogo 
  console.log(this.path)
    
  

    this.id = this.route.snapshot.queryParams["id"];

    this.getInvoice();
    this.getdata = [];
  }


  ngOnInit() {}




  generatePdf(){

   

   var container = document.getElementById("download");
   
   html2canvas(container,
    {
       useCORS: true, 
      
    }).then(
        function(canvas){
          var data = canvas.toDataURL();
                var docDefinition = {
                  pageSize: 'A4',
                pageMargins: [1, 1, 1, 1],
                 content: [{
                       image: data,
                       width: 530 , 
                       height: 700 , 
                       absolutePosition: {  
                               x: 20,
                               y: 4
                              }
                   }]
               };
              pdfMake.createPdf(docDefinition).download("Invoce.pdf");
  
        }
      )

    }







  

  getInvoice() {
    let id = this.id;
    this.http
      .get("http://localhost:8443/admin/invoices/getOneInvoices" + "/" + id)
      .subscribe((res: any) => {
        this.invoices = res.data;
        // this.dtTrigger.next();

        this.getdata = this.invoices.items;

      });
  }
}
