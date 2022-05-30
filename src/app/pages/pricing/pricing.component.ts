import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-pricing",
  templateUrl: "./pricing.component.html",
  styleUrls: ["./pricing.component.css"],
})
export class PricingComponent implements OnInit {


  public PtSingleUserMonth: any;
  public PtMultiUserMonth: any;
  public dSingleUserMonth: any;
  public dMultiUserMonth: any;
  public epMultiUserMonth: any;

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

  constructor() {
  }

  ngOnInit() {

  }

  getUser(event, val) {

    if (val == 'ptSingle') {
      this.PtSingleUser = event;
      this.ptSingleoneMonthAmount = (this.PtSingleMonthCost * this.PtSingleUser)
    }

    if (val == 'ptMulti') {
      this.PtMultiUser = event;
      this.ptMultioneMonthAmount = (this.PtMultiMonthCost * this.PtMultiUser)

    }

    if (val == 'dSingle') {
      this.dSingleUser = event;
      this.dSingleoneMonthAmount = (this.dSingleMonthCost * this.dSingleUser)

    }

    if (val == 'dMulti') {
      this.dMultiUser = event;
      this.dMultioneMonthAmount = (this.dMultiMonthCost * this.dMultiUser)
    }
    if (val == 'epMulti') {
      this.epMultiUser = event;
      console.log(this.epMultiUser, "<<<<<<<<<<<<<<>>>>>>>>>>")
      this.epMultioneMonthAmount = (this.epMultiMonthCost * this.epMultiUser)
      console.log(this.epMultioneMonthAmount, "kkkkllllll")

    }


  }
  getPlan(val) {
    if (val == 'ptSingle') {
      this.totalPtSingleMonthAmount = (this.ptSingleoneMonthAmount * this.PtSingleUserMonth);
    }

    if (val == 'ptMulti') {
      this.totalPtMultiMonthAmount = (this.ptMultioneMonthAmount * this.PtMultiUserMonth);

    }

    if (val == 'dSingle') {
      this.totaldSingleMonthAmount = (this.dSingleoneMonthAmount * this.dSingleUserMonth);

    }
    if (val == 'dMulti') {
      this.totaldMultiMonthAmount = (this.dMultioneMonthAmount * this.dMultiUserMonth);
    }
    if (val == 'epMulti') {
      this.totalEpMonthAmount = (this.epMultioneMonthAmount * this.epMultiUserMonth);
      console.log(this.totalEpMonthAmount, "..../..../.")

    }

  }


}
