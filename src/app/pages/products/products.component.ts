import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AdminAuthenticationService } from "src/app/core/storage/authentication-admin.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  AllProductList: any;
  public productDetails: any;
  public corporateId: any;
  public adminId: any;
  public productDetailsGroup = [];
  todayDate: Date;
  date1: any;
  date2: any;
  diffDays: any;
  totalRemaining = [];
  constructor(
    private http: HttpClient,
    private adminAuthenticationService: AdminAuthenticationService,
    private router: Router
  ) {
    this.corporateId = sessionStorage.getItem("corporateId");
  }

  ngOnInit() {
    this.getAllProduct();
  }
  login(id) {
    this.http
      .get("http://localhost:8443/auth/login" + "/" + id)
      .subscribe((res: any) => {
        this.router.navigate(["/layout/dashboard/admin"]);
        this.adminAuthenticationService.login(
          res.data.id,
          res.data.companyEmail,
          res.data.companyName,
          res.data.companySite,
          res.data.id,
          res.data.pinCode,
          res.data.companyAddress,
          res.data.phone,
          res.data.mobile,
          res.data.location,
          res.data.cicon,
          res.data.cinvoice,
          res.data.cinvoicepre,
          res.data.packageName
        );
      });
  }

  calculateExpiryDays(expairyDate) {
    this.todayDate = new Date();

    this.date1 = new Date(this.todayDate);
    this.date2 = new Date(expairyDate);
    var diffDays = Math.floor(
      (this.date2 - this.date1) / (1000 * 60 * 60 * 24)
    );
    return diffDays;
  }

  getAllProduct() {
    this.http
      .get(
        "http://localhost:8443/mainadmin/myProducts" + "/" + this.corporateId
      )
      .subscribe((res: any) => {
        this.productDetails = res;
        console.log("<><><><><><>< this.totalRemaining><><><><><><><><><", res);
        this.productDetails.map((item) => {
          let data = this.calculateExpiryDays(item.group[0].to);
          var obj = {
            remaininigDays: data,
            packageName: item.packageName,
          };
          this.totalRemaining.push(obj);
          this.productDetailsGroup.push(item.group[0]);
        });
        console.log(
          "<><><><><><>< this.totalRemaining><><><><><><><><><",
          this.totalRemaining
        );
      });
  }

  renewPackage(val) {
    var id = val;

    this.router.navigate(["/pricings"], {
      queryParams: { adminId: id },
      skipLocationChange: true,
    });
  }

  adminlogin(id) {
    alert(id);
    this.http
      .get("http://localhost:8443/auth/register/get_Details" + "/" + id)
      .subscribe((res: any) => {
        console.log(res, "KKKKKKKKKKKKKKKKKK");
        if (res.result == 1) {
          this.router.navigate(["/layout/dashboard/admin"]);

          this.adminAuthenticationService.login(
            res.data.id,
            res.data.corporateId,
            res.data.companyEmail,
            res.data.companyName,
            res.data.companySite,
            res.data.pinCode,
            res.data.companyAddress,
            res.data.phone,
            res.data.mobile,
            res.data.location,
            res.data.cicon,
            res.data.cinvoice,
            res.data.cinvoicepre,
            res.data.packageName
          );
        } else {
          alert("wrong Id or pass");
        }
      });
  }
}
