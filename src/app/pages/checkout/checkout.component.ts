import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { param } from "jquery";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],

})
export class CheckoutComponent implements OnInit {
  totaldSingleMonthAmount: any;
  dSingleUser: any;
  totaldMultiMonthAmount: any;
  dMultiUser: any;
  totalPtSingleMonthAmount: any;
  PtSingleUser: any;
  totalPtMultiMonthAmount: any;
  PtMultiUser: any;
  totalEpMonthAmount: any;
  epMultiUser: any;




  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.totaldSingleMonthAmount = this.route.snapshot.queryParams["totaldSingleMonthAmount"];
    this.dSingleUser = this.route.snapshot.queryParams["dSingleUser"];

    this.totaldMultiMonthAmount = this.route.snapshot.queryParams["totaldMultiMonthAmount"];
    this.dMultiUser = this.route.snapshot.queryParams["dMultiUser"];

    this.totalPtSingleMonthAmount = this.route.snapshot.queryParams["totalPtSingleMonthAmount"];
    this.PtSingleUser = this.route.snapshot.queryParams["PtSingleUser"];

    this.totalPtMultiMonthAmount = this.route.snapshot.queryParams["totalPtMultiMonthAmount"];
    this.PtMultiUser = this.route.snapshot.queryParams["PtMultiUser"];

    this.totalEpMonthAmount = this.route.snapshot.queryParams["totalEpMonthAmount"];
    this.epMultiUser = this.route.snapshot.queryParams["epMultiUser"];


  }
}
