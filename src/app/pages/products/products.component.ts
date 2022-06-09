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
  public corporateId: any;
  constructor(private http: HttpClient, private adminAuthenticationService: AdminAuthenticationService, private router: Router) {

    this.corporateId = sessionStorage.getItem('corporateId')

  }

  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    console.log(this.corporateId, "corporatevjjhjfhj>>>>>>>>>>>")
    this.http.get("http://localhost:8443/checkout/getPremiumDetails" + "/" + this.corporateId).subscribe((res: any) => {
      this.AllProductList = res
      console.log(this.AllProductList, "??????????????????????????????????????")
    })
  }

  login(id) {
    this.http.get("http://localhost:8443/auth/login" + "/" + id).subscribe((res: any) => {
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
        res.data.cinvoicepre
      );

    })
  }
}
