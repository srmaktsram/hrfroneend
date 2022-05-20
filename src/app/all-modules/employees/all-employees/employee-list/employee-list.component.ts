import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HeaderComponent } from "src/app/header/header.component";

declare const $: any;
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public lstEmployee: any;
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;
  public departments: any;
  public designations: any;
  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;
  public user_type = sessionStorage.getItem("user_type");

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public DateJoin;
  newStatus= true;
  Holidays = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Leaves = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Clients = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Projects = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Tasks = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Chats = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  Assets = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];

  TimingSheets = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  adminId: string;
  current_location: any;
  employees: any;
  dataArray: any;
  lengthCount: any;
  constructor(
    private srvModuleService: AllModulesService,
    private http: HttpClient,private headerComponent:HeaderComponent,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );
    this.adminId = sessionStorage.getItem("adminId");
    this.getDepartments();

    this.getDesignation();
  }
  public initializeArray() {
    this.Holidays = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];

    this.Leaves = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.Clients = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.Projects = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.Tasks = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.Chats = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.Assets = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
    this.TimingSheets = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
  }
  public getDepartments() {
    this.http
      .get("http://localhost:8443/admin/department/getData")
      .subscribe((data) => {
        this.departments = data;
      });
  }
  public getDesignation() {
    this.http
      .get("http://localhost:8443/admin/designation/getData")
      .subscribe((data) => {
        this.designations = data;
      });
  }
  ngOnInit() {
    this.getNotifications();
    // for floating label

    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
    this.loadEmployee();
    // add employee form validation
    this.addEmployeeForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      UserName: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
    });

    // edit form validation
    this.editEmployeeForm = this.formBuilder.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      UserName: ["", [Validators.required]],
      // Password: ["", [Validators.required]],
      // ConfirmPassword: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // manually rendering Data table

  // rerender(): void {
  //   $("#datatable").DataTable().clear();
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.destroy();
  //   });

  //   this.lstEmployee = [];
  //   this.loadEmployee();
  //   //

  //   setTimeout(() => {
  //     this.dtTrigger.next();
  //   }, 2000);
  // }

  // Get Employee  Api Call
  loadEmployee() {
    // this.srvModuleService.get(this.url).subscribe((data) => {

    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((data) => {
        console.log("get Employees", data);
        this.lstEmployee = data;
        this.rows = this.lstEmployee;
        this.srch = [...this.rows];
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getNotifications() {
    this.http
      .get(
        "http://localhost:8443/admin/notificationSetting/getNotificationSetting" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.employees = data[0].notification.employee;
      });
  }
  // Add employee  Modal Api Call
  addEmployee() {
    if (this.addEmployeeForm.invalid) {
      this.markFormGroupTouched(this.addEmployeeForm);
      return;
    }

    let obj = {
      firstname: this.addEmployeeForm.value.FirstName,
      lastname: this.addEmployeeForm.value.LastName,
      username: this.addEmployeeForm.value.UserName,
      email: this.addEmployeeForm.value.Email,
      password: this.addEmployeeForm.value.Password,
      confirmpassword: this.addEmployeeForm.value.ConfirmPassword,
      employeeId: this.addEmployeeForm.value.EmployeeID,
      joindate: this.addEmployeeForm.value.JoinDate,
      phone: this.addEmployeeForm.value.PhoneNumber,
      department: this.addEmployeeForm.value.DepartmentName,
      designation: this.addEmployeeForm.value.Designation,
      // mobile: this.addEmployeeForm.value.mobile,
      role: this.addEmployeeForm.value.role,
      Holidays: this.Holidays,
      Leaves: this.Leaves,
      Clients: this.Clients,
      Projects: this.Projects,
      Tasks: this.Tasks,
      Chats: this.Chats,
      Assets: this.Assets,
      TimingSheets: this.TimingSheets,
      adminId: this.adminId,
      location: this.current_location,
    };

    this.http
      .post("http://localhost:8443/admin/allemployees/addemployee", obj)
      .subscribe((data: any) => {
        this.loadEmployee();
        let document = data.data;
        let author = "Admin";
        let message = 'added a new employee ';
        let functions = document.firstName+" in "+document.department + " department";
        let time = document.createDate;
        if (this.employees == true) {
          this.http
            .post(
              "http://localhost:8443/admin/allNotification/createNotification" +
                "/" +
                this.adminId,
              { message, author, functions, time }
            )
            .subscribe((data: any) => {
              this.headerComponent.getAllNotifications()
              console.log(this.headerComponent.getAllNotifications(),"Header")
            });
        }
      });

    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }
  getAllNotifications() {
    if (this.user_type == "admin") {
        this.http
          .get(
            "http://localhost:8443/admin/notifications/getAllNotification" +
              "/" +
              this.adminId
          )
          .subscribe((data: any) => {
            this.dataArray = data[0].notifications;
            this.lengthCount = this.dataArray.length;

            if (this.lengthCount <= 4) {
              this.newStatus = true;
            } else if (this.lengthCount >= 5) {
              this.newStatus = false;
            }
          });
      
    }
  }


  // to know the date picker changes
  from(data) {
    this.DateJoin = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // edit modal api call
  editEmployee() {
    let id = this.editId;

    let obj = {
      firstName: this.editEmployeeForm.value.FirstName,
      lastName: this.editEmployeeForm.value.LastName,
      username: this.editEmployeeForm.value.UserName,
      email: this.editEmployeeForm.value.Email,
      // password: this.editEmployeeForm.value.Password,
      // confirmpassword: this.editEmployeeForm.value.ConfirmPassword,
      employeeId: this.editEmployeeForm.value.EmployeeID,
      joindate: this.editEmployeeForm.value.JoinDate,
      phone: this.editEmployeeForm.value.PhoneNumber,

      department: this.editEmployeeForm.value.DepartmentName,
      designation: this.editEmployeeForm.value.Designation,
      mobile: this.editEmployeeForm.value.mobile,
      role: this.editEmployeeForm.value.role,
      Holidays: this.Holidays,
      Leaves: this.Leaves,
      Clients: this.Clients,
      Projects: this.Projects,
      Tasks: this.Tasks,
      Chats: this.Chats,
      Assets: this.Assets,
      TimingSheets: this.TimingSheets,
      // id: this.editId,
    };
    // this.srvModuleService.update(obj, this.url).subscribe((data1) => {
    this.http
      .patch("http://localhost:8443/admin/allemployees/update" + "/" + id, obj)
      .subscribe((data) => {
        this.loadEmployee();
        // $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
      });

    $("#edit_employee").modal("hide");
    this.toastr.success("Employeee Updated sucessfully...!", "Success");
  }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;

    const index = this.lstEmployee.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstEmployee[index];
    let DateJoin = this.pipe.transform(toSetValues.joindate, "dd-MM-yyyy");

    this.editEmployeeForm.patchValue({
      FirstName: toSetValues.firstName,
      LastName: toSetValues.lastName,
      UserName: toSetValues.employeeId,
      Email: toSetValues.email,
      EmployeeID: toSetValues.employeeId,
      JoinDate: DateJoin,
      PhoneNumber: toSetValues.phone,
      DepartmentName: toSetValues.department,
      Designation: toSetValues.designation,
    });
    this.Holidays = toSetValues.Holidays;
    this.Leaves = toSetValues.Leaves;
    this.Clients = toSetValues.Clients;
    this.Projects = toSetValues.Projects;
    this.Tasks = toSetValues.Tasks;
    this.Chats = toSetValues.Chats;
    this.Assets = toSetValues.Assets;
    this.TimingSheets = toSetValues.TimingSheets;
  }

  // delete employee data api call
  deleteEmployee() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    // this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
    this.http
      .patch("http://localhost:8443/admin/allemployees/delete" + "/" + id, obj)
      .subscribe((data) => {
        this.loadEmployee();
        // $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
      });

    $("#delete_employee").modal("hide");
    this.toastr.success("Employee deleted sucessfully..!", "Success");
  }

  //search by Id
  searchId(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();

        return d.employeeId.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.rows.push(...temp);
    } else {
      this.loadEmployee();
    }
  }

  //search by name
  searchName(val) {
    if (val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();

        return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.rows.push(...temp);
    } else {
      this.loadEmployee();
    }
  }
  getSearchData(val, val1) {
    if (val && val1) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        val1 = val1.toLowerCase();

        return (
          (d.firstName.toLowerCase().indexOf(val) !== -1 || !val) &&
          (d.designation.toLowerCase().indexOf(val1) !== -1 || !val1)
        );
      });

      this.rows.push(...temp);
    } else {
      this.loadEmployee();
    }
  }

  //search by purchase
  searchByDesignation(val) {
    if (val.trim()) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.rows.push(...temp);
    } else {
      this.loadEmployee();
    }
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }

  checkCheckBoxvalueHolidays(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].read = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].write = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].create = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].delete = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].import = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].export = true;
      } else {
        const objIndex = this.Holidays.findIndex((obj) => obj.id == val);
        this.Holidays[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueLeaves(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].read = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].write = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].create = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].delete = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].import = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].export = true;
      } else {
        const objIndex = this.Leaves.findIndex((obj) => obj.id == val);
        this.Leaves[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueClients(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].read = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].write = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].create = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].delete = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].import = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].export = true;
      } else {
        const objIndex = this.Clients.findIndex((obj) => obj.id == val);
        this.Clients[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueProjects(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].read = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].write = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].create = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].delete = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].import = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].export = true;
      } else {
        const objIndex = this.Projects.findIndex((obj) => obj.id == val);
        this.Projects[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueTasks(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].read = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].write = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].create = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].delete = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].import = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].export = true;
      } else {
        const objIndex = this.Tasks.findIndex((obj) => obj.id == val);
        this.Tasks[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueChats(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].read = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].write = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].create = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].delete = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].import = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].export = true;
      } else {
        const objIndex = this.Chats.findIndex((obj) => obj.id == val);
        this.Chats[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueAssets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].read = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].write = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].create = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].delete = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].import = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].export = true;
      } else {
        const objIndex = this.Assets.findIndex((obj) => obj.id == val);
        this.Assets[objIndex].export = false;
      }
    }
  }

  checkCheckBoxvalueTimingSheets(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].read = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].write = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].create = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].delete = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].import = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].export = true;
      } else {
        const objIndex = this.TimingSheets.findIndex((obj) => obj.id == val);
        this.TimingSheets[objIndex].export = false;
      }
    }
  }

  getId(id) {
    sessionStorage.setItem("empid", id);
    this.router.navigate(["/layout/employees/employeeprofile"]);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
