import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpParams } from "@angular/common/http";

declare const $: any;
@Component({
  selector: "app-kyc-list",
  templateUrl: "./kyc-list.component.html",
  styleUrls: ["./kyc-list.component.css"],
})
export class KycListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  public addClientForm: FormGroup;
  public editClientForm: FormGroup;
  public tempId: any;
  public adminId: any;
  public aId: any;
  public companiesList = [];

  public data = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

   public aadhaarRemark:string;
   public panRemark:string;

  editId: any;

  invoices: any;
  panCardPath: string;

  projects: any;
  tasks: any;
  chats: any;
  estimates: any;
  timingSheets: any;
  companys: any[];
  filtereddata: any[];
  searchId: any;
  searchName: any;
  public employeeId: any;
  searchCompany: any;
  conversions: any;
  leads: any;
  addKyc: FormGroup;
  public multImages = [];
  adharImg: any;
  aadharBackImg: any;
  panImg: any;
  errorAadhaarExtension = true;
  errAadhaarSize = true;
  errorBackAdhaarExtension = true;
  errBackAadhaarSize = true;
  errorPanExtension = true;
  errPanSize = true;
  id: any;
  panCard: any;
  aadhaarCardBack: any;
  aadhaarCardPath: string;
  aadhaarBackCardPath: string;
  aadhaarCard: any;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.aId = sessionStorage.getItem("aId");
    this.addKyc = this.formBuilder.group({
      aadhaarCardNo: ["", [Validators.required]],
      panCardNo: ["", [Validators.required]],
    });
    this.getKycDetails();
  }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // setCuurentDetailsPan(id, panCard) {
  //   alert("111")
  //   this.id = id;

  // }

  selectAadhaar(event: any) {
    if (event.target.files.length > 0) {
      this.adharImg = event.target.files[0];
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg"
      ) {
        this.errorAadhaarExtension = true;
        if (event.target.files[0].size < 200 * 1024) {
          this.errAadhaarSize = true;
          this.updateAadhaar();
        } else {
          this.errAadhaarSize = false;
        }
      } else {
        this.errAadhaarSize = true;

        this.errorAadhaarExtension = false;
      }
    }
  }
  selectAadhaarBack(event: any) {
    if (event.target.files.length > 0) {
      this.aadharBackImg = event.target.files[0];
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg"
      ) {
        this.errorBackAdhaarExtension = true;
        if (event.target.files[0].size < 200 * 1024) {
          {
            this.errBackAadhaarSize = true;
            this.updateBackAadhaar();
          }
        } else {
          this.errBackAadhaarSize = false;
        }
      } else {
        this.errBackAadhaarSize = true;
        this.errorBackAdhaarExtension = false;
      }
    }
  }
  selectPan(event: any) {
    if (event.target.files.length > 0) {
      this.panImg = event.target.files[0];

      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg"
      ) {
        this.errorPanExtension = true;
        if (event.target.files[0].size < 200 * 1024) {
          this.errPanSize = true;
          this.updatePan();
        } else {
          this.errPanSize = false;
        }
      } else {
        this.errPanSize = true;

        this.errorPanExtension = false;
      }
    }
  }
  updateAadhaar() {
    var fd = new FormData();

    fd.append("file", this.adharImg);
    let params = new HttpParams();
    params = params.set("aId", this.aId);
    // params = params.set("aadhaarRemark", this.addKyc.value.aadhaarRemark);

    this.http
      .patch("http://localhost:8443/affiliates/kyc/updateKyc1?" + params, fd)
      .subscribe((res: any) => {
        console.log(res, "front");
        this.getKycDetails();
      });
  }
  updateBackAadhaar() {
    var fd = new FormData();

    fd.append("file", this.aadharBackImg);
    let params = new HttpParams();
    params = params.set("aId", this.aId);
    this.http
      .patch("http://localhost:8443/affiliates/kyc/updateKyc2?" + params, fd)
      .subscribe((res: any) => {
        console.log(res, "Back");

        this.getKycDetails();
      });
  }
  updatePan() {
    var fd = new FormData();

    fd.append("file", this.panImg);
    let params = new HttpParams();
    params = params.set("aId", this.aId);
    this.http
      .patch("http://localhost:8443/affiliates/kyc/updateKyc3?" + params, fd)
      .subscribe((res: any) => {
        console.log(res, "Pan");
        this.id = res.id;

        this.getKycDetails();
      });
  }
  updateKyc() {
    let params = new HttpParams();
    params = params.set("aId", this.aId);
    params = params.set("aadhaarCardNo", this.addKyc.value.aadhaarCardNo);
    params = params.set("panCardNo", this.addKyc.value.panCardNo);

    this.http
      .patch("http://localhost:8443/affiliates/kyc/updateKyc4?" + params, {})
      .subscribe((res: any) => {
        console.log(res, "Details");

        this.getKycDetails();
      });
  }

  getKycDetails() {
    this.http
      .get("http://localhost:8443/affiliates/kyc/getKyc" + "/" + this.aId)
      .subscribe((response: any) => {
        this.panCard = response.panCard;
        this.aadhaarCardBack = response.aadhaarCardBack;
        this.aadhaarCard = response.aadhaarCard;
        this.aadhaarRemark = response.aadhaarRemark;
        this.panRemark = response.panRemark;
        console.log(this.panRemark,"for Pan")
        this.panCardPath = `http://localhost:8443/${this.panCard}`;
        this.aadhaarBackCardPath = `http://localhost:8443/${this.aadhaarCardBack}`;
        this.aadhaarCardPath = `http://localhost:8443/${this.aadhaarCard}`;

        this.addKyc.patchValue({
          aadhaarCardNo: response.aadhaarCardNo,
          panCardNo: response.panCardNo,
        });
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
