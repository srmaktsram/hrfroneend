import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  data: any;
  getdata: any;
  // exportAsConfig: ExportAsConfig = {
  //   type: 'png', // the type you want to download
  //    elementIdOrContent:'print-section'   // the id of html/table element
    
  // }
  companyInvoiceLogo: string;
  // public dtTrigger: Subject<any> = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    // private exportAsService: ExportAsService
  ) {


    this.companyInvoiceLogo = `http://localhost:8443/${sessionStorage.getItem(
      "cinvoice"
    )}`;

    this.id = this.route.snapshot.queryParams["id"];

    this.getInvoice();
    this.getdata = [];
  }


  ngOnInit() {}


  // downloadPDF() {
  //   // download the file using old school javascript method
  //   this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
  //     // save started
  //   });
  //   // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
  //   this.exportAsService.get(this.exportAsConfig).subscribe((res:any) => {
  //     console.log(res);
  //   });
  // }


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
