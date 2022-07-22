import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";
import { switchMap } from "rxjs/operators";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  totalAmount: any;
  dMultiUser: any;
  ipAddress: any;
  location: any;
  totalUser: any;

  public checkoutForm: FormGroup;
  public month: any;
  public showPromo = true;
  public corporateId: any;
  public email: any;
  public mobile: any;
  public companyName: any;
  public adminId: any;
  public payAmount: any;
  public tl: any;
  public checkId: any;
  ordersId: any;
  packageName: any;
  getdata: any;
  applied: boolean = false;
  email_error = true;
  companyName_error = true;
  globalEmail: any;
  globalId: any;
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
    private cookieService: CookieService,
    private ngxService: NgxUiLoaderService
  ) {
    this.corporateId = sessionStorage.getItem("corporateId");
    this.getip();
  }

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      companyName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      adminId: new FormControl("", [
        Validators.required,
        Validators.maxLength(6),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      address: new FormControl("", [
        Validators.required,
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      panNo: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      gstNo: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        WhiteSpaceValidator.noWhiteSpace,
      ]),
      userCount: new FormControl(""),
    });

    this.totalAmount = this.route.snapshot.queryParams["totalAmount"];
    this.totalUser = this.route.snapshot.queryParams["totalUser"];
    this.corporateId = this.route.snapshot.queryParams["corporate"];
    this.packageName = this.route.snapshot.queryParams["packageName"];
    this.month = this.route.snapshot.queryParams["days"] * 30;
    this.adminId = this.route.snapshot.queryParams["adminId"];
    this.payAmount = this.totalAmount;
    this.fillData(this.adminId);
  }

  getip() {
    this.http
      .get("https://jsonip.com")
      .pipe(
        switchMap((value: any) => {
          this.ipAddress = value.ip;
          let url = `https://ipapi.co/${value.ip}/json/`;
          return this.http.get(url);
        })
      )
      .subscribe((data) => {
        this.location = data;
      });
  }

  getPayment() {
    this.email_error = true;
    this.companyName_error = true;
    this.ngxService.start();
    let corporateId = this.corporateId;
    this.globalEmail = this.checkoutForm.value.email;
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
        this.globalId = res.data.id;
        if (res.result == 0) {
          if (this.packageName === "Basic(Single-User)") {
            this.createAdminRegister();
            this.premium(0);
          } else {
            this.createOrderId();
          }
        } else if (res.result == 1) {
          this.email_error = false;
          this.ngxService.stop();
        } else if (res.result == 2) {
          this.companyName_error = false;
          this.ngxService.stop();
        } else {
          this.email_error = false;
          this.companyName_error = false;
          this.ngxService.stop();
        }
      });
  }
  createOrderId() {
    let amount = this.totalAmount;

    this.http
      .post("http://localhost:8443/checkout/create/OrderId", { amount: amount })
      .subscribe((res: any) => {
        this.completPayment(res.amount, res.id);
        let orderId = res.id;
        let id = this.globalId;

        this.http
          .patch("http://localhost:8443/checkout/order/update/order", {
            orderId,
            id,
          })
          .subscribe((res: any) => {});
      });
  }

  completPayment(amount, orderid) {
    let options: any = {
      key: "rzp_test_isZmsi0Pb9wEcU",
      amount: amount,
      currency: "INR",
      name: "SRMAK TECHNOLOGICAL SYSTEM PRIVATE LIMITED",
      description: "Premium Package Subscription",
      image:
        "https://pro.socialcashclub.in/assets/images/all_images/myloadernew.png",
      order_id: orderid,
      modal: {
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
      adminId: this.adminId,
      paymentId: paymentId,
      amount: this.payAmount,
      totalUser: this.totalUser,
      corporateId: this.corporateId,
      packageName: this.packageName,
      month: this.month,
      companyName: this.checkoutForm.value.companyName,
    };

    this.http
      .post("http://localhost:8443/checkout/create/packageDetails", obj)
      .subscribe((res: any) => {
        this.saveOrderDetails(paymentId);
      });
  }

  saveOrderDetails(paymentId) {
    this.http
      .post(
        "http://localhost:8443/checkout/create/Details" +
          "/" +
          this.corporateId,
        {
          amount: this.payAmount,
          paymentId: paymentId,
          packageName: this.packageName,
          email: this.globalEmail,
          status: 1,
          companyName: this.checkoutForm.value.companyName,
        }
      )
      .subscribe((res: any) => {
        if (res.packageName === "Basic(Single-User)") {
          this.http
            .patch(
              "http://localhost:8443/mainadmin/hr_user/updateHr_user" +
                "/" +
                this.corporateId,
              { status: "Free" }
            )
            .subscribe((data: any) => {});
        } else {
          this.http
            .patch(
              "http://localhost:8443/mainadmin/hr_user/updateHr_user" +
                "/" +
                this.corporateId,
              { status: "Premium" }
            )
            .subscribe((data: any) => {});
        }
        this.ngxService.stop();
        window.location.replace("http://localhost:4200/products");
      });
  }
  createAdminRegister() {
    if (this.adminId) {
      let obj = {
        adminId: this.adminId,
        corporateId: this.corporateId,
        amount: this.payAmount,
        companyPan: this.checkoutForm.value.panNo,
        companyGst: this.checkoutForm.value.gstNo,
        mobile: this.checkoutForm.value.mobile,
        companyEmail: this.checkoutForm.value.email,
        companyName: this.checkoutForm.value.companyName,
        companyAddress: this.checkoutForm.value.address,
        packageName: this.packageName,
        status: 1,
        location: this.location,
      };

      this.http
        .post("http://localhost:8443/checkout/create/adminRegister", obj)
        .subscribe((res: any) => {});
    } else {
      const generateId = Math.random().toString(36).slice(7);
      this.adminId = generateId;

      let obj = {
        adminId: this.adminId,
        corporateId: this.corporateId,
        amount: this.payAmount,
        companyPan: this.checkoutForm.value.panNo,
        companyGst: this.checkoutForm.value.gstNo,
        mobile: this.checkoutForm.value.mobile,
        companyEmail: this.checkoutForm.value.email,
        companyName: this.checkoutForm.value.companyName,
        companyAddress: this.checkoutForm.value.address,
        packageName: this.packageName,
        status: 1,
        location: this.location,
      };

      this.http
        .post("http://localhost:8443/checkout/create/adminRegister", obj)
        .subscribe((res: any) => {});
    }
  }

  fillData(val) {
    var adminId = val;

    this.http
      .get(
        "http://localhost:8443/checkout/orders/getAdminRegister" + "/" + adminId
      )
      .subscribe((res: any) => {
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
        }
      });
  }

  getOffer(event) {
    let code = event;

    this.http
      .get(
        "http://localhost:8443/mainadmin/promocode/getPromoOffer" + "/" + code
      )
      .subscribe((data: any) => {
        if (data) {
          var amount = this.totalAmount * (data.codeValue / 100);
          this.payAmount = this.totalAmount - amount;
          this.applied = true;
        } else {
          this.payAmount = this.totalAmount;
        }
      });
  }
}
