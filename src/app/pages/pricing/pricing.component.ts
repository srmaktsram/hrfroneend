import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

declare const $: any;
@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.css"],
})
export class PricingComponent implements OnInit {

  check = true;
  public corporateId: any;
  public PtSingleUserMonth: any;
  public PtMultiUserMonth: any;
  public dSingleUserMonth: any;
  public dMultiUserMonth: any;
  public epMultiUserMonth: any;
  public email: any;
  public mobile: any;
  public companyName: any;
  public address: any;

  public dSingleMonthCost = 10;
  public dMultiMonthCost = 15;
  public PtSingleMonthCost = 20;
  public PtMultiMonthCost = 25;
  public epMultiMonthCost = 30;

  public PtSingleUser: any;
  public PtMultiUser: any;
  public dSingleUser: any;
  public dMultiUser: any;
  public epMultiUser: any;

  public totalPtSingleMonthAmount: any;
  public totalPtMultiMonthAmount: any;
  public totaldSingleMonthAmount: any;
  public totaldMultiMonthAmount: any;
  public totalEpMonthAmount: any;

  public ptSingleoneMonthAmount: any;
  public ptMultioneMonthAmount: any;
  public epMultioneMonthAmount: any;
  public dSingleoneMonthAmount: any;
  public dMultioneMonthAmount: any;

  userDetails: any = null;
  priceDetails: any = null;

  public isShow1 = true;
  public isShow2 = true;
  public isShow3 = true;
  public isShow4 = true;
  public isShow5 = true;



  constructor(private router: Router, private cookieService: CookieService) { }


  ngOnInit() { }


  getUser(event, val) {
    this.userDetails = event

    if (val == "ptSingle") {

      if (this.userDetails > 0 && this.priceDetails > 0) {
        this.isShow1 = false;
      } else {
        this.isShow1 = true;
      }
      this.PtSingleUser = event;
      this.ptSingleoneMonthAmount = this.PtSingleMonthCost * this.PtSingleUser;
    }

    if (val == "ptMulti") {

      if (this.userDetails > 0 && this.priceDetails > 0) {
        this.isShow2 = false;
      } else {
        this.isShow2 = true;
      }
      this.PtMultiUser = event;
      this.ptMultioneMonthAmount = this.PtMultiMonthCost * this.PtMultiUser;
    }

    if (val == "dSingle") {

      if (this.userDetails > 0 && this.priceDetails > 0) {
        this.isShow3 = false;
      } else {
        this.isShow3 = true;
      }
      this.dSingleUser = event;
      this.dSingleoneMonthAmount = this.dSingleMonthCost * this.dSingleUser;
    }

    if (val == "dMulti") {

      if (this.userDetails > 0 && this.priceDetails > 0) {
        this.isShow4 = false;
      } else {
        this.isShow4 = true;
      }
      this.dMultiUser = event;
      this.dMultioneMonthAmount = this.dMultiMonthCost * this.dMultiUser;
    }

    if (val == "epMulti") {

      if (this.userDetails > 0 && this.priceDetails > 0) {
        this.isShow5 = false;
      } else {
        this.isShow5 = true;
      }
      this.epMultiUser = event;
      this.epMultioneMonthAmount = this.epMultiMonthCost * this.epMultiUser;
    }
  }
  getPlan(val, val2) {
    this.priceDetails = val2;

    if (val == "ptSingle") {

      if (this.userDetails > 0 && this.priceDetails > 0) {

        this.isShow1 = false;
      } else {
        this.isShow1 = true;
      }

      this.PtSingleUserMonth = val2;
      this.totalPtSingleMonthAmount =
        this.ptSingleoneMonthAmount * this.PtSingleUserMonth;
    }

    if (val == "ptMulti") {

      if (this.userDetails > 0 && this.priceDetails > 0) {

        this.isShow2 = false;
      } else {
        this.isShow2 = true;
      }

      this.PtMultiUserMonth = val2;
      this.totalPtMultiMonthAmount =
        this.ptMultioneMonthAmount * this.PtMultiUserMonth;
    }

    if (val == "dSingle") {
      if (this.userDetails > 0 && this.priceDetails > 0) {

        this.isShow3 = false;
      } else {
        this.isShow3 = true;
      }

      this.dSingleUserMonth = val2;
      this.totaldSingleMonthAmount =
        this.dSingleoneMonthAmount * this.dSingleUserMonth;
    }
    if (val == "dMulti") {
      if (this.userDetails > 0 && this.priceDetails > 0) {

        this.isShow4 = false;
      } else {
        this.isShow4 = true;
      }

      this.dMultiUserMonth = val2;
      this.totaldMultiMonthAmount =
        this.dMultioneMonthAmount * this.dMultiUserMonth;
    }
    if (val == "epMulti") {
      if (this.userDetails > 0 && this.priceDetails > 0) {

        this.isShow5 = false;
      } else {
        this.isShow5 = true;
      }

      this.epMultiUserMonth = val2;
      this.totalEpMonthAmount =
        this.epMultioneMonthAmount * this.epMultiUserMonth;
    }
  }
  getData(val) {
    this.corporateId = sessionStorage.getItem("corporateId");

    if (sessionStorage.getItem("currentUser") == "HrUserLogin") {
      if (val == "dSingle") {
        this.router.navigate(["/checkouts"], {
          queryParams: {
            totalAmount: this.totaldSingleMonthAmount,
            totalUser: this.dSingleUser,
            corporate: this.corporateId,
            packageName: "Diamond(Single-User)",
            days: this.dSingleUserMonth,
          },
          skipLocationChange: true,
        });
      }
      if (val == "dMulti") {
        this.router.navigate(["/checkouts"], {
          queryParams: {
            totalAmount: this.totaldMultiMonthAmount,
            totalUser: this.dMultiUser,
            corporate: this.corporateId,
            packageName: "Diamond(Multi-User)",
            days: this.dMultiUserMonth,
          },
          skipLocationChange: true,
        });
      }
      if (val == "epMulti") {
        this.router.navigate(["/checkouts"], {
          queryParams: {
            totalAmount: this.totalEpMonthAmount,
            totalUser: this.epMultiUser,
            corporate: this.corporateId,
            packageName: "Enterprise(Multi-User)",
            days: this.epMultiUserMonth,
          },
          skipLocationChange: true,
        });
      }
      if (val == "ptSingle") {
        this.router.navigate(["/checkouts"], {
          queryParams: {
            totalAmount: this.totalPtSingleMonthAmount,
            totalUser: this.PtSingleUser,
            corporate: this.corporateId,
            packageName: "Platinum(Single-User)",
            days: this.PtSingleUserMonth,
          },
          skipLocationChange: true,
        });
      }
      if (val == "ptMulti") {
        this.router.navigate(["/checkouts"], {
          queryParams: {
            totalAmount: this.totalPtMultiMonthAmount,
            totalUser: this.PtMultiUser,
            corporate: this.corporateId,
            packageName: "Platinum(Multi-User)",
            days: this.PtMultiUserMonth,
          },
          skipLocationChange: true,
        });
      }
    }
    else {
      this.router.navigate(["/hr_registration"]);

    }
    // } else {
    //   this.router.navigate(["/pages/hr_registration"]);
    // }
  }

}
