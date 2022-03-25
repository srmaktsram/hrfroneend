import { getLocaleDateFormat } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
  styleUrls: ['./attendance-admin.component.css']
})
export class AttendanceAdminComponent implements OnInit {

  public limit = 10
  public offset = 5
  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.getData()

  }

  getData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", 15);
    queryParams = queryParams.append("offset", 5);
    queryParams = queryParams.append("month", "july");
    queryParams = queryParams.append("year", 2022);

    this.http.get("http://localhost:8443/admin/attendance/search", { params: queryParams }).subscribe((res) => {

      console.log(res);

    })

  }
}
