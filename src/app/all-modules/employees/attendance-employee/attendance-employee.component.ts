import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { id } from 'src/assets/all-modules-data/id';

@Component({
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.css']
})
export class AttendanceEmployeeComponent implements OnInit {
  data: any


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
    let obj = {
      adminId: '1',
      employeeId: '4',
    }
    this.http.post("http://localhost:8443/employee/attendance/create", obj).subscribe((data) => {
      console.log("postData", data);
      this.data = data
      this.punch = this.data.punchStatus
      sessionStorage.setItem("id", this.data.id)
      console.log("just try", this.punch)
    })
  }

  updatePunch() {
    // let params = new HttpParams();
    // params = params.set('id', "5a9e7a3f-b37e-46f2-a8e3-032c6e46d020");
    // // params = params.set('punchStatus', '1');

    const id = sessionStorage.getItem('id')
    let queryParams = new HttpParams();
    queryParams = queryParams.set("id", id);
    queryParams = queryParams.set("punchStatus", this.punch);
    queryParams = queryParams.set("punchStatus", this.punch);

    this.http.patch("http://localhost:8443/employee/attendance/update?" + queryParams, {}).subscribe((data) => {
      console.log(data);
      this.data = data
      this.punch = this.data.punchStatus
    })

  }


  loadData() {

    let queryParams = new HttpParams();
    queryParams = queryParams.set("limit", 10);
    queryParams = queryParams.set("offset", 5)
    // queryParams = queryParams.set("date", "25/03/2022")             
    queryParams = queryParams.set("year", "2022")
    queryParams = queryParams.set("month", "03")

    // queryParams = queryParams.set("punchStatus", this.punch);

    this.http.get("http://localhost:8443/employee/attendance/search?" + queryParams, {}).subscribe((data) => {

      console.log("getDataApi", data);

    })
  }
}
