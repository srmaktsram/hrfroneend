import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { param } from "jquery";
import { FormGroup, FormControl } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  totalAmount: any;
  dMultiUser: any;

  totalUser: any;

  public checkoutForm: FormGroup;
  public month: any;
  public showPromo = true;
  public corporateId: any;
  public email: any;
  public mobile: any;
  public companyName: any;
  public tl: any;
  ordersId: any;
  packageName: any;
  getdata: any;
  _window(): any {
    return window;
  }

  get nativeWindow(): any {
    return this._window();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.corporateId = sessionStorage.getItem("corporateId");
  }

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      companyName: new FormControl(""),
      email: new FormControl(""),
      mobile: new FormControl(""),
      address: new FormControl(""),
      panNo: new FormControl(""),
      gstNo: new FormControl(""),
      userCount: new FormControl(""),
      corporateId: new FormControl(""),
    });

    this.totalAmount = this.route.snapshot.queryParams["totalAmount"];
    this.totalUser = this.route.snapshot.queryParams["totalUser"];
    this.corporateId = this.route.snapshot.queryParams["corporate"];
    this.packageName = this.route.snapshot.queryParams["packageName"];
    this.month = this.route.snapshot.queryParams["days"] * 30;
  }

  getPayment() {
    let corporateId = this.corporateId;
    var obj = {
      packageName: this.packageName,
      panNo: this.checkoutForm.value.panNo,
      gstNo: this.checkoutForm.value.gstNo,
      mobile: this.checkoutForm.value.mobile,
      email: this.checkoutForm.value.email,
      companyName: this.checkoutForm.value.companyName,
      address: this.checkoutForm.value.address,
      aId: this.cookieService.get("aid"),
      status: "0",
      renewStatus: "0",
    };

    this.http
      .post(
        "http://localhost:8443/checkout/create/Details" + "/" + corporateId,
        obj
      )
      .subscribe((res: any) => {
        console.log("this is the create order History>>>>", res);
        if (this.packageName === "Basic(Single-User)") {
          this.createAdminRegister();
          this.premium(0);
        } else {
          this.createOrderId();
        }
      });
  }
  createOrderId() {
    let amount = this.totalAmount;
    this.http
      .post("http://localhost:8443/checkout/create/OrderId", { amount: amount })
      .subscribe((res: any) => {
        this.completPayment(res.amount, res.id);
      });
  }

  completPayment(amount, orderid) {
    let options: any = {
      key: "rzp_test_isZmsi0Pb9wEcU",
      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: "INR",
      name: "SRMAK TECHNOLOGICAL SYSTEM PRIVATE LIMITED", // company name or product name
      description: "Premium Package Subscription", // product description
      image:
        "https://pro.socialcashclub.in/assets/images/all_images/myloadernew.png", // company logo or product image
      order_id: orderid, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      theme: {
        color: "#0c238a",
      },
    };
    options.handler = (response, error) => {
      options.response = response;

      const razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_order_id = response.razorpay_order_id;
      const razorpay_signature = response.razorpay_signature;

      this.evaluate(razorpay_payment_id, razorpay_order_id, razorpay_signature);
    };

    options.modal.ondismiss = () => {
      window.location.reload();
    };
    var rzp1 = new this.nativeWindow.Razorpay(options);

    rzp1.open();
  }
  evaluate(razorpay_payment_id, razorpay_order_id, razorpay_signature) {
    var paymentId = razorpay_payment_id;
    this.http
      .post("http://localhost:8443/checkout/testpayment", {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
      })
      .subscribe((responce: any) => {
        console.log("this is the testPayment>>>>>", responce);
        if (responce.data === "Signature Verified") {
          /////create premium details
          this.createAdminRegister();
          this.premium(paymentId);
        }
      });
  }
  usePromo() {
    this.showPromo = false;
  }

  premium(paymentId) {
    let obj = {
      paymentId: paymentId,
      amount: this.totalAmount,
      totalUser: this.totalUser,
      corporateId: this.corporateId,
      packageName: this.packageName,
      month: this.month,
      companyName: this.checkoutForm.value.companyName,
    };

    this.http
      .post("http://localhost:8443/checkout/create/packageDetails", obj)
      .subscribe((res: any) => {
        console.log("this is the  PreviousDetails>>>>>>>>>>>", res);

        this.saveOrderDetails();
      });
  }

  saveOrderDetails() {
    this.http
      .post(
        "http://localhost:8443/checkout/create/Details" +
          "/" +
          this.corporateId,
        {
          amount: this.totalAmount,
          packageName: this.packageName,
          status: 1,
          companyName: this.checkoutForm.value.companyName,
        }
      )
      .subscribe((res: any) => {
        console.log("this is the orderDetails>>>>>>>>>>", res);
        this.router.navigate(["/products"]);
      });
  }
  createAdminRegister() {
    const generateId = Math.random().toString(36).slice(5);

    var obj = {
      adminId: generateId,
      corporateId: this.corporateId,
      amount: this.totalAmount,
      companyPan: this.checkoutForm.value.panNo,
      companyGst: this.checkoutForm.value.gstNo,
      mobile: this.checkoutForm.value.mobile,
      companyEmail: this.checkoutForm.value.email,
      companyName: this.checkoutForm.value.companyName,
      companyAddress: this.checkoutForm.value.address,
      packageName: this.packageName,
      status: 1,
    };

    this.http
      .post("http://localhost:8443/checkout/create/adminRegister", obj)
      .subscribe((res: any) => {
        console.log("this is the adminRegister>>>>>>>>>>>>>>>>>>>", res);
      });
  }

  fillData(val) {
    var corporateId = val;
    this.http
      .get(
        "http://localhost:8443/checkout/orders/getAdminRegister" +
          "/" +
          corporateId
      )
      .subscribe((res: any) => {
        console.log(",.,.,.,.,.,.<><><><><><", res);

        this.getdata = res;
        if (this.getdata) {
          this.checkoutForm.patchValue({
            companyName: this.getdata.companyName,
            email: this.getdata.companyEmail,
            mobile: this.getdata.mobile,
            address: this.getdata.companyAddress,
            panNo: this.getdata.companyPan,
            gstNo: this.getdata.companyGst,
          });
        } else {
          alert("Invalid Corporate Id ........");
        }
      });
  }

  getOffer(event) {
    let code = event;
    this.http.get("url").subscribe((data: any) => {
      // console.log(data, "dataComesFromApi");
    });
  }
}
