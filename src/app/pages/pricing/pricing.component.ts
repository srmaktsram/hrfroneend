import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
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

  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit() { }

  getUser(event, val) {
    if (val == "ptSingle") {
      this.PtSingleUser = event;
      this.ptSingleoneMonthAmount = this.PtSingleMonthCost * this.PtSingleUser;
    }

    if (val == "ptMulti") {
      this.PtMultiUser = event;
      this.ptMultioneMonthAmount = this.PtMultiMonthCost * this.PtMultiUser;
    }

    if (val == "dSingle") {
      this.dSingleUser = event;
      this.dSingleoneMonthAmount = this.dSingleMonthCost * this.dSingleUser;
    }

    if (val == "dMulti") {
      this.dMultiUser = event;
      this.dMultioneMonthAmount = this.dMultiMonthCost * this.dMultiUser;
    }

    if (val == "epMulti") {
      this.epMultiUser = event;
      this.epMultioneMonthAmount = this.epMultiMonthCost * this.epMultiUser;
    }
  }
  getPlan(val, val2) {
    if (val == "ptSingle") {
      this.PtSingleUserMonth = val2;
      this.totalPtSingleMonthAmount =
        this.ptSingleoneMonthAmount * this.PtSingleUserMonth;
    }

    if (val == "ptMulti") {
      this.PtMultiUserMonth = val2;
      this.totalPtMultiMonthAmount =
        this.ptMultioneMonthAmount * this.PtMultiUserMonth;
    }

    if (val == "dSingle") {
      this.dSingleUserMonth = val2;
      this.totaldSingleMonthAmount =
        this.dSingleoneMonthAmount * this.dSingleUserMonth;
    }
    if (val == "dMulti") {
      this.dMultiUserMonth = val2;
      this.totaldMultiMonthAmount =
        this.dMultioneMonthAmount * this.dMultiUserMonth;
    }
    if (val == "epMulti") {
      this.epMultiUserMonth = val2;
      this.totalEpMonthAmount =
        this.epMultioneMonthAmount * this.epMultiUserMonth;
    }
  }
  getData(val) {
    this.corporateId = sessionStorage.getItem("corporateId");
    console.log(sessionStorage.getItem("currentUser"), this.corporateId)
    if (sessionStorage.getItem("currentUser") == "loggedin") {
      if (val == "dSingle") {
        this.router.navigate(["/pages/checkout"], {
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
        this.router.navigate(["/pages/checkout"], {
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
        this.router.navigate(["/pages/checkout"], {
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
        this.router.navigate(["/pages/checkout"], {
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
        this.router.navigate(["/pages/checkout"], {
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
      this.router.navigate(["/pages/hr_registration"]);
    }
  }
}
