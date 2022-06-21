import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main-admin-dashboard",
  templateUrl: "./main-admin-dashboard.component.html",
  styleUrls: ["./main-admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  public chartData;
  public chartOptions;
  public lineData;
  public adminId: any;
  public lineOption;
  public barColors = {
    a: "#00c5fb",
    b: "#0253cc",
  };
  public lineColors = {
    a: "#00c5fb",
    b: "#0253cc",
  };
  lstClients: any;
  public rows = [];
  public srch = [];

  lstInvoices: any;
  lstProject: any;
  newEmployeeCount: any;
  lstPayments: any;
  employeeCount: any;
  lstEmployee: any;
  public pipe = new DatePipe("en-US");
  public projectCount: any;
  public clientCount: any;
  joinDateArray = [];
  name = [];
  data: any;
  EstimateArray = [];
  premiumClientsCount: any;
  freeClientsCount: any;
  freeTodayClientsCount: any;
  premiumTodayClientsCount: any;
  invoices: Object;
  AllPayments: any;
  tempYear: any;
  totalAmount: any;
  tempDateArray: any;
  tempDate1: any;
  tempDate2: any;
  createYear: any;
  SalesArray= [];
  affiliateData: any;
  clientData: any;
  todayFreeData: any;

  constructor(private http: HttpClient) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.getAllAffiliates();
    this.getInvoiceRevenue();
    this.getInvoiceSales();
    this.getAffiliateRevenue();
    this.getPremiumAdmins();
    this.getDemoAdmins();
    this.getTodayDemoAdmins();
    this.getTodayPremiumAdmins();
    this.getAllInvoices();
    this.getPayments();
    this.getAllClients();

    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    
  }
  public getInvoiceRevenue() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/invoiceMainAdmin/totalRevenueInvoice"
      )
      .subscribe((data: any) => {
        this.tempDate1 = data[0].createDate.split(" ");
        this.tempDate2 = this.tempDate1[0].split("-");
        this.tempYear = this.tempDate2[2];

        let EstimateTotal = 0;
        
        for (let i = 0; i < data.length; i++) {
          let createDateTime = data[i].createDate.split(" ");
          let createDateSplit = createDateTime[0].split("-");
          this.createYear = createDateSplit[2];
         
          if (this.createYear == this.tempYear) {
            EstimateTotal = EstimateTotal + parseInt(data[i].grandTotal);
            
            if (i == data.length - 1) {
              let totalEstimate = EstimateTotal;

              let obj = { y: this.tempYear, a: totalEstimate, b: 60 };
              this.EstimateArray.push(obj);
            }
          } else {
            let totalEstimate = EstimateTotal;

            
            let obj = { y: this.tempYear, a: totalEstimate, b: 60 };

            this.EstimateArray.push(obj);

           

            let currentDateTime = data[i].createDate.split(" ");
            let currentDate = currentDateTime[0].split("-");
            this.tempYear = currentDate[2];
            EstimateTotal = parseInt(data[i].grandTotal);


            if (i == data.length-1) {
              let totalEstimate = EstimateTotal;

              let obj = { y: this.tempYear, a: totalEstimate, b: 60 };
              this.EstimateArray.push(obj);
            }
          }
        }

        this.chartData = this.EstimateArray;
      });
  }
  public getInvoiceSales() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/invoiceMainAdmin/totalRevenueInvoice"
      )
      .subscribe((data: any) => {
        let tempDate1 = data[0].createDate.split(" ");
        let tempDate2 = tempDate1[0].split("-");
        let temYear = tempDate2[2];

        let EstimateTotal = 0;
        let totalCount = 0;
        for (let i = 0; i < data.length; i++) {
          let createDateTime = data[i].createDate.split(" ");
          let createDateSplit = createDateTime[0].split("-");
         let createYear = createDateSplit[2];
          
          
          if (createYear == temYear) {
            EstimateTotal = EstimateTotal + parseInt(data[i].grandTotal);
            totalCount=totalCount+1
          
            if (i == data.length - 1) {
              let totalEstimate = EstimateTotal;

              let obj = { y: temYear, b: totalEstimate, a: totalCount };
              this.SalesArray.push(obj);
            }
          } else {
           let totalEstimate = EstimateTotal;

            
            let obj = { y: temYear, b: totalEstimate, a: totalCount };
            this.SalesArray.push(obj);

          
            

            let currentDateTime = data[i].createDate.split(" ");
            let currentDate = currentDateTime[0].split("-");
            temYear = currentDate[2];
            EstimateTotal = parseInt(data[i].grandTotal);
            totalCount=1

            if (i == data.length-1) {
             

              let obj = { y: temYear, b: totalEstimate, a: totalCount };
              this.SalesArray.push(obj);
            }
          }
        }

        this.lineData = this.SalesArray;
      });
  }

  public getAffiliateRevenue() {
    this.http
      .get("http://localhost:8443/mainadmin/affiliate/getAllAffiliate")
      .subscribe((res: any) => {
        this.data = res;
      });
  }


  public getPremiumAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/premiumClient/getPremiumClients")
      .subscribe((res: any) => {
        this.premiumClientsCount = res.length;
      });
  }
  public getDemoAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/freeClient/getFreeClients")
      .subscribe((res: any) => {
       
        this.freeClientsCount = res.length;
      });
  }
  public getTodayDemoAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/freeClient/getTodayFreeClients")
      .subscribe((res: any) => {
        this.todayFreeData = res;
        this.freeTodayClientsCount = this.todayFreeData.length;
      });
  }

  public getTodayPremiumAdmins() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/premiumClient/getTodayPremiumClients"
      )
      .subscribe((res: any) => {
        this.premiumTodayClientsCount = res.length;
      });
  }
  getAllInvoices() {
    this.http
      .get("http://localhost:8443/mainadmin/invoiceMainAdmin/getInvoices")
      .subscribe((res: any) => {
        this.invoices = res.data;
      });
  }
  getPayments() {
    this.http
      .get("http://localhost:8443/mainadmin/paymentsMainAdmin/getPayments")
      .subscribe((data: any) => {
        this.AllPayments = data;
      });
  }
  public getAllClients() {
    this.http
      .get("http://localhost:8443/mainadmin/allClient/getAllClients")
      .subscribe((res: any) => {
        this.clientData = res;
      });
  }

  public getAllAffiliates() {
    this.http
      .get("http://localhost:8443/mainadmin/affiliate/getAllAffiliate")
      .subscribe((res: any) => {
        this.affiliateData = res;
      });
  }
}
