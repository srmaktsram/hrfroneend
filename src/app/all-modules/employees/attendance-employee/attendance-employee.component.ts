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
  public Datetime: any;
  public calMonthData: Number;
  public employeeAttandance: any;
  public rows: [];
  public hours: any;
  public minute: any;
  public srch: [];
  punchtimeIn: [];
  public totalProduction = []
  storeData: any
  public adminId = sessionStorage.getItem("adminId")
  public employeeid = sessionStorage.getItem("employee_login_id")
  public dtTrigger: Subject<any> = new Subject();
  punchDetails: any;
  public pipe = new DatePipe("en-US");
  storeDate: any;
  day: any;
  newDay: string;
  public dateDetails: any;
  punchlength: any;
  punchused: any;
  public TotalDay = 0;
  TotalOneWeakProduction: number;
  TotalOneMonthProduction: number;

  constructor(
    private http: HttpClient
  ) {
    this.getData()
  }
  ngOnInit() {

    this.loadData();

  }

  public punch: any
  getData() {
    let adminId = this.adminId
    let employeeid = this.employeeid
    this.http.post("http://localhost:8443/employee/attendance/create", { adminId, employeeid }).subscribe((data) => {
      this.data = data
      this.punch = this.data.punchStatus
      sessionStorage.setItem("id", this.data.id)
    })
  }
  updatePunch() {
    const id = sessionStorage.getItem('id')
    let queryParams = new HttpParams();
    queryParams = queryParams.set("id", id);
    queryParams = queryParams.set("punchStatus", this.punch);
    queryParams = queryParams.set("punchStatus", this.punch);

    this.http.patch("http://localhost:8443/employee/attendance/update?" + queryParams, {}).subscribe((data) => {
      this.data = data
      // console.log(data, "jbjdjkhjdhjdh>>>>>>>>>>>>")
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
      this.punchused = this.employeeAttandance[0].punch;
      this.punchlength = this.punchused.length
      console.log(this.punchlength, "/////")
      console.log("pikachu>>>>>>>>", this.punchused)
      // this.rows = this.employeeAttandance;
      // this.srch = [...this.rows];
      console.log(this.employeeAttandance, "opopoopppp")


      var countmin = 0;
      var counthour = 0;
      this.employeeAttandance.map((item) => {


        this.punchDetails = item.punch
        let b = this.calculate()


        let month = item.date.split("-")
        if (month[1] == "04") {
          let hh = b.split(":");
          let min = Number(hh[1]);
          let hour = Number(hh[0]);
          console.log("this is HH>>>>>>", countmin, ">>>>>>>>>", min)
          countmin = countmin + (min);
          counthour = counthour + (hour);

          if (countmin > 59) {
            countmin = countmin - 59;
            counthour = counthour + 1;
          }
          this.hours = counthour;
          this.minute = countmin;
        }
        if (this.TotalDay < 7) {
          this.TotalOneWeakProduction = this.totalProduction.push(b)
        } else {
          this.TotalOneMonthProduction = this.totalProduction.push(b)
        }

      })



      var today = new Date()
      var day = today.toLocaleString('en-us', { weekday: 'long' })
      this.newDay = day.slice(0, 3);


    })




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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
    return startTime;

  }

  diff(start, end) {
    // console.log("satat", start, end)
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    // diff -= minutes = minutes * 1000 * 60 * 60
    // var second = Math.floor(diff / 1000)
    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
      hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;

  }

  addTimes(startTime, endTime) {
    // console.log("adTimes", startTime, endTime)
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
}




