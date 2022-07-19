import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
import { DatePipe } from "@angular/common";
import { add } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.css']
})
export class AttendanceEmployeeComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  data: any
  public prod;
  public sum = 0
  public Production: any;
  public Datetime: any;
  public calMonthData: Number;
  public TodayProduction: any;
  public employeeAttandance: any;
  public rows: [];
  public currentMonth: any;
  public hours: any;
  public monthlyData: any;
  public minute: any;
  public srch: [];
  public monthlyStatus: any
  public monthlyid: any
  punchtimeIn: [];
  public totalProduction = []
  storeData: any
  public weaklyHoursProduction: any;
  public weaklyMinutesProduction: any;

  public adminId
  public employeeid
  public weaklyProduction = [];
  public dtTrigger: Subject<any> = new Subject();
  punchDetails: any;
  public pipe = new DatePipe("en-US");
  storeDate: any;
  day: any;
  newDay: string;
  public dateDetails: any;
  public profileImage: any;
  punchlength: any;
  punchused: any;
  TotalOneWeakProduction: any;
  TotalOneMonthProduction: number;
  punchStatus: any;
  user_type: string;
  attendancewrite: string;
  constructor(
    private http: HttpClient
  ) {
    this.adminId = sessionStorage.getItem("adminId")
    this.employeeid = sessionStorage.getItem("employee_login_id")
    this.user_type = sessionStorage.getItem("user_type")
    this.profileImage = sessionStorage.getItem("profileImage")
    alert(this.profileImage)
    this.attendancewrite = sessionStorage.getItem("attendancewrite")
    this.getData()
    this.createData()
  }
  ngOnInit() {
    this.loadData();
  }
  public punch: any
  getData() {
    let adminId = this.adminId
    let employeeid = this.employeeid
    let employeeName = sessionStorage.getItem("firstName")
    this.http.post("http://localhost:8443/employee/attendance/create", { adminId, employeeid, employeeName }).subscribe((data) => {
      this.data = data
      console.log("postApipppppppppp>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.data)
      this.punch = this.data.punchStatus
      sessionStorage.setItem("id", this.data.id)
    })
  }
  updatePunch() {
    const id = sessionStorage.getItem('id')
    let queryParams = new HttpParams();
    queryParams = queryParams.set("id", id);
    queryParams = queryParams.set("punchStatus", this.punch);

    this.http.patch("http://localhost:8443/employee/attendance/update?" + queryParams, {}).subscribe((data) => {
      this.data = data
      console.log(this.data, "phlaApi,,,,,,,,,")
      this.punch = this.data.punchStatus
      this.loadData()
    })
  }


  loadData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.set("adminId", sessionStorage.getItem("adminId"))
    queryParams = queryParams.set("employeeid", sessionStorage.getItem("employee_login_id"))

    this.http.get("http://localhost:8443/employee/attendance/search?" + queryParams, {}).subscribe((data: any) => {
      this.employeeAttandance = data;
      console.log(this.employeeAttandance, "this is employeeAttandance data")
      this.punchused = this.employeeAttandance[0].punch;
      this.punchlength = this.punchused.length;
      var countmin = 0;
      var counthour = 0;
      this.employeeAttandance.map((item) => {
        this.punchDetails = item.punch
        console.log(item, "kkkkkkkk..................")
        let b = this.calculate();
        console.log(b, "calculateProduction")
        let month = item.date.split("-")
        var today = new Date();
        let currentMonth = today.getMonth() + 1;
        if (month[1] == currentMonth) {
          let currentDay = today.getDay();
          console.log(currentDay, "currentDay,,,,,,,,,,,,,,,,,")
          for (let i = currentDay; i >= currentDay; i--) {
            let hh = b.split(":");
            let min = Number(hh[1]);
            let hour = Number(hh[0]);
            countmin = countmin + (min);
            counthour = counthour + (hour);
            if (countmin > 59) {
              countmin = countmin - 59;
              counthour = counthour + 1;
            }
            console.log(countmin, "countMinute>>>>>")
            console.log(counthour, "countHours>>>>>>")
          }
          this.hours = counthour;
          this.minute = countmin;
          console.log(this.hours, this.minute, "Ghanta Minute and Seconds>>>>>>>>>>>>>>>>>>")

        }

      })

      var today = new Date()
      var day = today.toLocaleString('en-us', { weekday: 'long' })
      this.newDay = day.slice(0, 3);


    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }


  calculate() {

    let startTime = '00:00:00'
    let totalProduction
    let timeDiff;
    let i = 0;
    while (i <= this.punchDetails.length) {

      if (this.punchDetails[i] && this.punchDetails[i + 1]) {

        timeDiff = this.diff(this.punchDetails[i].time, this.punchDetails[i + 1].time)
      } else {
        break;
      }
      i += 2
      totalProduction = this.addTimes(startTime, timeDiff)
      startTime = totalProduction
    }
    this.Production = startTime;
    console.log(this.Production, "calculatefunctionProfduction>>>>>>>>>>>>>>>>")
    return this.Production;

  }


  diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);


    if (hours < 0)
      hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;

  }

  addTimes(startTime, endTime) {
    var times = [0, 0, 0]
    var max = times.length

    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }

    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]

    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }

    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
  }

  createData() {

    let adminId = this.adminId
    let employeeid = this.employeeid
    let employeeName = sessionStorage.getItem("firstName")

    this.http.post("http://localhost:8443/admin/monthlyAttandance/create", { adminId, employeeid, employeeName }).subscribe((res: any) => {
      console.log("monthlyPostApi", res)
      this.data = res
      this.punchStatus = this.data[0].punchStatus
      this.monthlyid = this.data[0].id
      console.log(this.monthlyid, this.punchStatus, "......................>>>>>>>>")
    })
  }

  updateMonthlyPunch() {

    setTimeout(() => {
      let queryParams = new HttpParams();
      queryParams = queryParams.set("id", this.monthlyid);
      if (this.Production < '03:00:00') {
        queryParams = queryParams.set("status", 0)
        queryParams = queryParams.set("production", this.Production)
        queryParams = queryParams.set("profileImage", this.profileImage)
      }
      else if ('03:00:00' < this.Production && this.Production < '07:00:00') {

        queryParams = queryParams.set("status", 1)
        queryParams = queryParams.set("production", this.Production)
        queryParams = queryParams.set("profileImage", this.profileImage)
      }
      else if (this.Production > '07:00:00') {
        queryParams = queryParams.set("status", 3)
        queryParams = queryParams.set("production", this.Production)
        queryParams = queryParams.set("profileImage", this.profileImage)
        console.log("profile iMAGE>>>>>", typeof (this.profileImage))
      }
      this.http.patch("http://localhost:8443/admin/monthlyAttandance/update?" + queryParams, {}).subscribe((res: any) => {
        console.log("updateMonthlyeDataApiopppppp-------->", res)
        this.punchStatus = this.data.punchStatus

      })
    }, 1000)


  }

}




