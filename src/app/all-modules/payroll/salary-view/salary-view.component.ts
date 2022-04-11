import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { id } from "src/assets/all-modules-data/id";

@Component({
  selector: "app-salary-view",
  templateUrl: "./salary-view.component.html",
  styleUrls: ["./salary-view.component.css"],
})
export class SalaryViewComponent implements OnInit {
  public adminId = sessionStorage.getItem("adminId");
  public id: any;
  public total: Number;
  allSalary: any;
  editId: any;
  value: string;
  public total1: Number;

  constructor(private http: HttpClient) {
    this.id = sessionStorage.getItem("slipId");
  }

  ngOnInit() {
    this.LoadPaylip();
  }

  LoadPaylip() {
    this.http
      .get(
        "http://localhost:8443/admin/employeeSalary/getEmployeePayslip" +
          "/" +
          this.id
      )
      .subscribe((data1) => {
        this.allSalary = data1[0];
        let pf = Number(this.allSalary.pf);
        let tds = Number(this.allSalary.tds);
        let esi = Number(this.allSalary.esi);
        let othersDed = Number(this.allSalary.othersDed);
        this.total = pf + tds + esi + othersDed;

        let basic = Number(this.allSalary.basic);
        let hra = Number(this.allSalary.hra);
        let conveyance = Number(this.allSalary.conveyance);
        let othersAdd = Number(this.allSalary.othersAdd);
        this.total1 = basic + hra + conveyance + othersAdd;

        // this.rows = this.allSalary;
        // this.srch = [...this.rows];
      });
  }
}
