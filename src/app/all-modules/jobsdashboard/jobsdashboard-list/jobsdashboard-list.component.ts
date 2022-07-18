import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-jobsdashboard-list",
  templateUrl: "./jobsdashboard-list.component.html",
  styleUrls: ["./jobsdashboard-list.component.css"],
})
export class JobsdashboardListComponent implements OnInit {
  public chartData;
  public chartOptions;
  public totalApplication: any;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#2196f3",
    b: "#6610f2",
  };
  public lineColors = {
    a: "#373651",
    b: "#E65A26",
    c: "#a1a1a1",
  };
  public allAppliedCandidates = [];
  lstFees: any;
  rows: any;
  srch: any[];
  user_type: string;
  jobdashboardwriteRecep: string;
  jobswriteHr: string;
  constructor(private http: HttpClient) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobdashboardwriteRecep = sessionStorage.getItem("jobdashboardwriteRecep");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");
    
    this.getFullData();
    this.getAppliedCandidates();
    this.getShortListedDetails();
  }

  ngOnInit() {
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
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
      ykeys: ["a", "b", "c"],
      labels: ["UI Developer", "Android", "Web Designing"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b, this.lineColors.c],
    };

    this.lineData = [
      { y: "2006", a: 20, b: 2, c: 1 },
      { y: "2007", a: 10, b: 2, c: 3 },
      { y: "2008", a: 5, b: 3, c: 6 },
      { y: "2009", a: 5, b: 4, c: 8 },
      { y: "2010", a: 20, b: 1, c: 10 },
    ];
  }
  //////////////////////////////
  getAppliedCandidates() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getAppliedCandidate")
      .subscribe((data: any) => {
        this.totalApplication = data.length;
      });
  }
  //////////////////////////////
  getShortListedDetails() {
    this.http
      .get("http://localhost:8443/admin/job/jobRegister/getQualifiedCandidate")
      .subscribe((data: any) => {
        this.lstFees = data;
        this.rows = this.lstFees;
        this.srch = [...this.rows];
      });
  }
  /////////////////////////////////////////////
  getFullData() {
    this.http
      .get("http://localhost:8443/admin/jobs/getAllJobsData")
      .subscribe((data: any) => {
        this.allAppliedCandidates = data;
        console.log(
          "this is Applied Condidate>>> .......",
          this.allAppliedCandidates
        );
      });
  }
}
