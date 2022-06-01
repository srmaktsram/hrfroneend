import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
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
  premiumClientsCount: any;
  freeClientsCount: any;
  freeTodayClientsCount: any;
  premiumTodayClientsCount: any;
  invoices: Object;
  AllPayments: any;

  constructor(private http: HttpClient) {
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
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

    this.chartData = [
      { y: "2006", a: 10, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: "2006", a: 50, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 50 },
    ];
  }
  public getPremiumAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/premiumClient/getPremiumClients")
      .subscribe((res: any) => {
        this.data = res;
        this.premiumClientsCount = this.data.length;
      });
  }
  public getDemoAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/freeClient/getFreeClients")
      .subscribe((res: any) => {
        this.data = res;
        this.freeClientsCount = this.data.length;
      });
  }
  public getTodayDemoAdmins() {
    this.http
      .get("http://localhost:8443/mainadmin/freeClient/getTodayFreeClients")
      .subscribe((res: any) => {
        this.data = res;
        this.freeTodayClientsCount = this.data.length;
      });
  }

  public getTodayPremiumAdmins() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/premiumClient/getTodayPremiumClients"
      )
      .subscribe((res: any) => {
        this.data = res;
        this.premiumTodayClientsCount = this.data.length;
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
        this.data = res;
      });
  }
}
