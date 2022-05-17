import { getLocaleDateFormat } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
  styleUrls: ['./attendance-admin.component.css']
})
export class AttendanceAdminComponent implements OnInit {

  public monthlyPunch: any;
  public currentDate: any;
  public adminId: any;
  public day: any;
  public month: any;
  public monthlyPunchData: any;
  lstAttandance: any;
  public pipe = new DatePipe("en-US");
  lstPunch: any;
  public todayDate = new Date();

  constructor(private http: HttpClient) {
    this.adminId = sessionStorage.getItem("adminId")

  }

  ngOnInit() {

    this.getData()

  }
  public monthDate: any = [{ date: '01', present: 'A' }]
  attendances: any = []
  getData() {

    this.http.get("http://localhost:8443/admin/monthlyAttandance/getData" + "/" + this.adminId).subscribe((res) => {
      console.log("attandanceData", res);
      this.lstAttandance = res
      console.log(this.lstAttandance, "jaggoomiyana tere jaisa na koiiiii")
      this.monthlyPunch = this.lstAttandance[this.lstAttandance.length - 1].monthlyPunchData
      console.log(this.monthlyPunch, "jwehjkhkjhejkwh")



      this.lstAttandance.map((data) => {
        this.attendances.push(data.monthlyPunchData)
      })

      console.log("My Attendance", this.attendances)

      this.attendances.map()



    })



  }


}
