import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-scheduling.component.html',
  styleUrls: ['./shift-scheduling.component.css']
})
export class ShiftSchedulingComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public url: any = "shiftscheduling";
  public tempId: any;
  public editId: any;
  public adminId: any;
  public addSheduleForm: FormGroup;
  public editSheduleForm: FormGroup;
  public lstShedule;

  public rows = [];
  public srch = [];
  user_type: string;
  employeewrite: string;
  employeewriteSub: string;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.employeewrite = sessionStorage.getItem("employeewrite");
    this.employeewriteSub = sessionStorage.getItem("employeewriteSub");
   }

  ngOnInit() {
    // Floating Label

    if ($('.floating').length > 0) {
      $('.floating').on('focus blur', function (e) {
        $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
    }
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.adminId = sessionStorage.getItem("adminId")
    this.LoadShedule();

    this.addSheduleForm = this.formBuilder.group({

      department: ["", [Validators.required]],
      employeeName: ["", [Validators.required]],
      date: ["", [Validators.required]],
      shift: ["", Validators.required],
      minStartTime: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      maxStartTime: ["", [Validators.required]],
      minEndTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      maxEndTime: ["", [Validators.required]],
      breakTime: ["", [Validators.required]],
      extraHrs: ["", [Validators.required]],
      publish: ["", [Validators.required]],

    })

    this.editSheduleForm = this.formBuilder.group({

      department: ["", [Validators.required]],
      employeeName: ["", [Validators.required]],
      date: ["", [Validators.required]],
      shift: ["", Validators.required],
      minStartTime: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      maxStartTime: ["", [Validators.required]],
      minEndTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      maxEndTime: ["", [Validators.required]],
      breakTime: ["", [Validators.required]],
      extraHrs: ["", [Validators.required]],
      publish: ["", [Validators.required]],
      recurringShift: ["", [Validators.required]],
      repeatEvery: ["", [Validators.required]],
      tuesday: ["", [Validators.required]],
      wednesday: ["", [Validators.required]],
      thursday: ["", [Validators.required]],
      friday: ["", [Validators.required]],
      saturday: ["", [Validators.required]],
      sunday: ["", [Validators.required]],
    })




  }
  // Get department list  Api Call
  LoadShedule() {
    this.http.get("http://localhost:8443/admin/Schedule/getSchedule" + "/" + this.adminId).subscribe((data) => {
      console.log("getApi", data)
      this.lstShedule = data;
      this.dtTrigger.next();
      this.rows = this.lstShedule;
      this.srch = [...this.rows];

    });
  }
  //search by Department
  employee(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name1.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  addShedule() {
    let obj = {
      department: this.addSheduleForm.value.department,
      employeeName: this.addSheduleForm.value.employeeName,
      date: this.addSheduleForm.value.date,
      shift: this.addSheduleForm.value.shift,
      minStartTime: this.addSheduleForm.value.minStartTime,
      startTime: this.addSheduleForm.value.startTime,
      maxStartTime: this.addSheduleForm.value.maxStartTime,
      minEndTime: this.addSheduleForm.value.minEndTime,
      endTime: this.addSheduleForm.value.endTime,
      maxEndTime: this.addSheduleForm.value.maxEndTime,
      breakTime: this.addSheduleForm.value.breakTime,
      extraHrs: this.addSheduleForm.value.extraHrs,
      publish: this.addSheduleForm.value.publish,
      adminId: this.adminId,

    }
    console.log("jdjsdg>>>>>>>>", obj)
    this.http.post("http://localhost:8443/admin/schedule/createSchedule", obj).subscribe((res) => {
      console.log("postApi", res)
    })

  }
  editShedule() {
    //  this.http.patch("url"+"/"+this.editId,obj).subscribe((res)=>{
    //    console.log("updateApi",res)
    //  })
  }

}
