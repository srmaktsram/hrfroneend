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
  public total: number;
  public otherD: number;
  public otherA: number;
  allSalary: any;
  editId: any;
  value: string;
  public total1: number;
  user_type: string;
  payrollswriteHr: string;

  constructor(private http: HttpClient) {
    this.id = sessionStorage.getItem("slipId");
    this.user_type = sessionStorage.getItem("user_type");
    this.payrollswriteHr = sessionStorage.getItem("payrollswriteHr");
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
        let leave = Number(this.allSalary.leave);
        let profTax = Number(this.allSalary.profTax);
        let labour = Number(this.allSalary.labour);
        let othersDed = Number(this.allSalary.othersDed);
        this.otherD = leave + profTax + labour + othersDed;
        this.total = pf + tds + esi + this.otherD;

        let basic = Number(this.allSalary.basic);
        let hra = Number(this.allSalary.hra);
        let conveyance = Number(this.allSalary.conveyance);
        let da = Number(this.allSalary.da);
        let allowance = Number(this.allSalary.allowance);
        let medicalAllowance = Number(this.allSalary.medicalAllowance);
        let othersAdd = Number(this.allSalary.othersAdd);
        this.otherA = da + allowance + medicalAllowance + othersAdd;

        this.total1 = basic + hra + conveyance + this.otherA;

        // this.rows = this.allSalary;
        // this.srch = [...this.rows];
      });
  }
}
