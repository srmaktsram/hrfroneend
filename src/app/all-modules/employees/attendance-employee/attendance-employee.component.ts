import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { id } from 'src/assets/all-modules-data/id';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';

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
  public employeeAttandance: any;
  public rows: [];
  public srch: [];
  punchtimeIn: [];
  storeData: any
  public adminId = sessionStorage.getItem("adminId")
  public employeeid = sessionStorage.getItem("employee_login_id")

  public dtTrigger: Subject<any> = new Subject();



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
      //console.log("just try", this.punch)
    })
  }

  updatePunch() {

    const id = sessionStorage.getItem('id')
    let queryParams = new HttpParams();
    queryParams = queryParams.set("id", id);
    queryParams = queryParams.set("punchStatus", this.punch);
    queryParams = queryParams.set("punchStatus", this.punch);

    this.http.patch("http://localhost:8443/employee/attendance/update?" + queryParams, {}).subscribe((data) => {
      //console.log(data);
      this.data = data
      this.punch = this.data.punchStatus
    })

  }

  date;
  time1;


  loadData() {

    let queryParams = new HttpParams();

    queryParams = queryParams.set("adminId", sessionStorage.getItem("adminId"))
    queryParams = queryParams.set("employeeid", sessionStorage.getItem("employee_login_id"))




    this.http.get("http://localhost:8443/employee/attendance/search?" + queryParams, {}).subscribe((data: any) => {


      //console.log("getDataApi", data);
      this.storeData = data
      this.employeeAttandance = this.storeData;
      this.rows = this.employeeAttandance;
      this.srch = [...this.rows];

    })


  }
}

