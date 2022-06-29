import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
declare const $:any
@Component({
  selector: "app-affiliates-dashboard",
  templateUrl: "./affiliates-dashboard.component.html",
  styleUrls: ["./affiliates-dashboard.component.scss"],
})
export class AffiliateAdminDashboardComponent implements OnInit {
  public aId:any;
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
  SalesArray = [];
  affiliateUrl: any;
  freeTodayLeads: any;
  allLeadsCount: any;
  totalConversionCount: any;
  todayconversions: any;
  totalIncome: any;
  totalWithdraw: any;
  

  constructor(private http: HttpClient) {
    this.aId = sessionStorage.getItem("aId");

    this.affiliateUrl = `http://localhost:4200?aid=${sessionStorage.getItem(
      "aId"
    )}`;
  }

  ngOnInit() {
    this.getTodayLeads();
    this.getAllLeads();
    this.getTodayConversions();
    this.getTotalConversions();
    this.getWallet();
    
    $("#myInput").prop('readonly', true);
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  public getTodayLeads() {
    this.http
      .get("http://localhost:8443/affiliates/leads/getTodayLeads"+"/"+this.aId)
      .subscribe((res: any) => {
        this.data = res;
        this.freeTodayLeads = this.data.length;
      });
  }

  public getAllLeads() {
    this.http
      .get("http://localhost:8443/affiliates/leads/getLeads"+"/"+this.aId)
      .subscribe((res: any) => {
        this.data = res;
        this.allLeadsCount = this.data.length;
      });
  }
  public getTodayConversions() {
    this.http
      .get("http://localhost:8443/affiliates/conversions/getTodayConversions"+"/"+this.aId)
      .subscribe((res: any) => {
        this.data = res;
        this.todayconversions = this.data.length;
      });
  }

  getTotalConversions() {
    this.http
      .get(
        "http://localhost:8443/affiliates/leads/getConversions" + "/" + this.aId
      )
      .subscribe((res: any) => {
        this.totalConversionCount = res.length;
        
      });
  }
  public getWallet() {
    let id=this.aId
    alert(id)


    this.http
      .get(
        "http://localhost:8443/affiliates/affiliate/getAffiliateWalletForDashboard" +
          "/" + id

      )
      .subscribe((res: any) => {

        this.totalIncome = res.total_balance;
        this.totalWithdraw = res.total_withdraw;
      });
  }

}
