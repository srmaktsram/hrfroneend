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
  public projectCount: any
  public clientCount: any;
  joinDateArray = []
  name = []

  constructor(
    private http: HttpClient,
  ) {
    this.adminId = sessionStorage.getItem("adminId")
  }

  ngOnInit() {
    this.getAllEmployee();
    this.getDataPayments()
    this.getDataProject();
    this.getDataClients();
    this.getDataInvoice();
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
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
      { y: '2006', a: 50, b: 90 },
      { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 },
      { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 },
      { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 50 }
    ];
  }

  getDataClients() {
    this.http.get("http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId).subscribe((res: any) => {
      this.lstClients = res;
      //console.log(this.lstClients, "opppppppppo")
      this.clientCount = this.lstClients.length

    })

  }

  getDataInvoice() {
    this.http.get("http://localhost:8443/admin/invoices/adminGetInvoices" + "/" + this.adminId).subscribe((res: any) => {
      this.lstInvoices = res.data

    })
  }

  getDataProject() {
    this.http.get("http://localhost:8443/admin/projects/getAdminproject" + "/" + this.adminId).subscribe((res: any) => {

      this.lstProject = res;
      this.projectCount = this.lstProject.length

    })
  }

  getDataPayments() {
    this.http.get("http://localhost:8443/admin/payments/adminGetPayments" + "/" + this.adminId).subscribe((res: any) => {
      //console.log("getdataPayments", res)
      this.lstPayments = res

    })
  }


  getAllEmployee() {

    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
        "/" +
        this.adminId
      )
      .subscribe((data: any) => {
        this.lstEmployee = data;
        //console.log(this.lstEmployee, "lllllllllllllp")
        this.employeeCount = this.lstEmployee.length

        let todayDate = new Date()
        let TodayDate = this.pipe.transform(
          todayDate,
          "dd-MM-yyyy"
        );

        let count = 0
        this.lstEmployee.map((item) => {
          if (TodayDate == item.joindate) {
            count = count + 1;
          }
        });
        this.newEmployeeCount = count
      })




  }
}
