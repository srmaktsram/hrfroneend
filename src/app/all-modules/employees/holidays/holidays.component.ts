import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient, } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-holidays",
  templateUrl: "./holidays.component.html",
  styleUrls: ["./holidays.component.css"],
})
export class HolidaysComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  lstHolidays: any;
  url: any = "holidays";
  public tempId: any;
  public editId: any;
  public rows: any;
  public srch: any;
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-IN");
  public addHolidayForm: FormGroup;
  public editHolidayForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");

  public editHolidayDate: any;
  holiday: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadholidays();
    this.getNotifications();
    

    this.addHolidayForm = this.formBuilder.group({
      HolidayName: ["", [Validators.required]],
      Holidaydate: ["", [Validators.required]],
      DaysName: ["", [Validators.required]],
    });

    // Edit Contact Form Validation And Getting Values

    this.editHolidayForm = this.formBuilder.group({
      editHolidayName: ["", [Validators.required]],
      editHolidayDate: ["", [Validators.required]],
      editDaysName: ["", [Validators.required]],
    });
  }

  // Get Employee  Api Call
  // public data: any;

  loadholidays() {

    this.http.get("http://localhost:8443/admin/holidays/getHolidays").subscribe((res: any) => {
      console.log(res,"list Holidays")

      this.lstHolidays = res.data;
      this.rows = this.lstHolidays;
      this.srch = [...this.rows];
    });
  }
////
getNotifications() {
  this.http
    .get(
      "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
        "/" +
        this.adminId
    )
    .subscribe((data: any) => {
      console.log(data, "lllll");
      this.holiday = data[0].notification.holidays;
      console.log(this.holiday, "holiday");
    });
}

  // Add holidays Modal Api Call

  addholidays() {
    if (this.addHolidayForm.invalid) {
      this.markFormGroupTouched(this.addHolidayForm)
      return
    }
    if (this.addHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.addHolidayForm.value.Holidaydate,
        "dd-MM-yyyy"
      );

      let adminId = sessionStorage.getItem("adminId")
      let obj = {
        title: this.addHolidayForm.value.HolidayName,
        holidayDate:holiday,
        day: this.addHolidayForm.value.DaysName,
        adminId: this.adminId,

      };

      this.http.post("http://localhost:8443/admin/holidays/createHolidays", obj).subscribe((res:any) => {
          this.loadholidays();
          console.log(res,"create Holidays")
          let document=res.data
          let author="Admin created"
          let message=document.title
          let functions="'s holiday"
          let time=document.createDate
          if (this.holiday== true) {
            alert("1")
          this.http.post("http://localhost:8443/admin/allNotification/createNotification"+"/"+this.adminId, {message,author,functions,time}).subscribe((data:any) => {
            this.loadholidays();
            console.log(data,"create HOLI NOTI")
          });}
        })

      $("#add_holiday").modal("hide");
      this.addHolidayForm.reset();
      this.toastr.success("Holidays added", "Success");
    }
  }

  from(data) {
    this.editHolidayDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit holidays Modal Api Call
  public id: any;
  editHolidays() {
    if (this.editHolidayForm.valid) {
      this.id = this.editId;
      let obj = {
        title: this.editHolidayForm.value.editHolidayName,
        holidayDate: this.editHolidayDate,
        day: this.editHolidayForm.value.editDaysName,
      };
      // this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      this.http.patch("http://localhost:8443/admin/holidays/updateHolidays" + "/" + this.id, obj).subscribe((res) => {
        this.loadholidays();
        });

      $("#edit_holiday").modal("hide");
      this.toastr.success("Holidays Updated succesfully", "Success");
    }
  }

  // Delete holidays Modal Api Call

  deleteHolidays() {
    let id = this.tempId
    let obj = {
      status: 2
    };

    this.http.patch("http://localhost:8443/admin/holidays/deleteHoliday" + "/" + id, obj).subscribe((res) => {
      this.loadholidays();
      });

      $("#delete_holiday").modal("hide");
      this.toastr.success("Holidays Deleted", "Success");
  }

  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstHolidays.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstHolidays[index];
    this.editHolidayForm.setValue({
      editHolidayName: toSetValues.title,
      editHolidayDate: toSetValues.holidayDate,
      editDaysName: toSetValues.day,
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
