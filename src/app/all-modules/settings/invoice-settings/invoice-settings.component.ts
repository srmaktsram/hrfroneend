import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-invoice-settings",
  templateUrl: "./invoice-settings.component.html",
  styleUrls: ["./invoice-settings.component.css"],
})
export class InvoiceSettingsComponent implements OnInit {
  public invoiceSettings: FormGroup;
  id: string;
  companyInvoiceLogo: string;
  cinvoice: any;
  companyInvoicePre: string;
  user_type: string;
  settingsWrite: string;
  settingsWriteSub: string;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.settingsWrite = sessionStorage.getItem("settingsWrite");
    this.settingsWriteSub = sessionStorage.getItem("settingsWriteSub");
    this.id = sessionStorage.getItem("adminId");
    // this.companyInvoiceLogo = sessionStorage.getItem("cinvoice");
    // alert(this.companyInvoiceLogo);
    this.companyInvoiceLogo = `http://localhost:8443/${sessionStorage.getItem(
      "cinvoice"
    )}`;
    this.companyInvoicePre = sessionStorage.getItem("cinvoicepre");
  }

  ngOnInit() {
    this.invoiceSettings = this.formBuilder.group({
      invoicePrefix: ["INV", [Validators.required]],
      invoiceLogo: [""],
    });
    this.invoiceSettings.patchValue({
      invoicePrefix: this.companyInvoicePre,
    });
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cinvoice = file;
    }
  }
  submitInvoiceSettings() {
    if (this.invoiceSettings.valid) {
      let params = new HttpParams();
      params = params.set(
        "cinvoicepre",
        this.invoiceSettings.value.invoicePrefix
      );
      params = params.set("id", this.id);
      const formData = new FormData();
      formData.append("file", this.cinvoice);
      console.log("this is params<><><><>",params);
      console.log("this is the fpormData<><><><",formData);
      this.http
        .post(
          "http://localhost:8443/admin/invoicesetting/file?" + params,
          formData
        )
        .subscribe((res: any) => {
          console.log("this is res <><><><><>",res);
          if (res.result == 1) {
            sessionStorage.setItem("cinvoice", res.data.cinvoice);
            sessionStorage.setItem("cinvoicepre", res.data.cinvoicepre);
            // window.location.reload();
          }
        });

      this.toastr.success("Invoice settings is added", "Success");
    }
  }
}
