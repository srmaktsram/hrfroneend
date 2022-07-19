import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AdminAuthenticationService } from "src/app/core/storage/authentication-admin.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

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
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.corporateId = sessionStorage.getItem("corporateId");
  }

  ngOnInit() {
    this.getAllProduct();
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

        this.productDetails.map((item) => {
          let data = this.calculateExpiryDays(item.group[0].to);
          var obj = {
            remaininigDays: data,
            packageName: item.packageName,
          };
          this.totalRemaining.push(obj);
          this.productDetailsGroup.push(item.group[0]);
        });
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
    this.http
      .get("http://localhost:8443/auth/register/get_Details" + "/" + id)
      .subscribe((res: any) => {
        this.http
          .get(
            "http://localhost:8443/mainadmin/packageAuth/getPackageAuthDetails" +
              "/" +
              res.data.packageName
          )
          .subscribe((response: any) => {
            if (res.result == 1) {
              this.router.navigate(["/layout/dashboard/admin"]);
              console.log("packageName", res.data.packageName);
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
                res.data.packageName,
                response
              );
            } else {
              this._snackBar.open(
                " No matching accounts have been found !",
                "",
                {
                  duration: 2000,
                  panelClass: "notif-success",

                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                }
              );
            }
          });
      });
  }
}
