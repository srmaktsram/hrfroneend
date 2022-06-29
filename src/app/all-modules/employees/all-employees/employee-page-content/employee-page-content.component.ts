import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { id } from "src/assets/all-modules-data/id";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-employee-page-content",
  templateUrl: "./employee-page-content.component.html",
  styleUrls: ["./employee-page-content.component.css"],
})
export class EmployeePageContentComponent implements OnInit {
  public lstEmployee: any;
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;
  public id: any;
  public departments: any;
  public designations: any;
  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
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
  DateJoin: string;
  adminId: string;
  dtTrigger: any;
  current_location: any;
  constructor(
    private srvModuleService: AllModulesService,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {
    this.current_location = JSON.parse(
      sessionStorage.getItem("current_location")
    );

    // this.adminId = sessionStorage.getItem("companyId");
    this.adminId = sessionStorage.getItem("adminId");
    this.getDesignation();
    this.getDepartments();
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
    this.loadEmployee();

    this.addEmployeeForm = this.formBuilder.group({
      FirstName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      LastName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      UserName: ["", [Validators.required, Validators.pattern('^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$')]],
      Password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      PhoneNumber: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      JoinDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
    });

    this.editEmployeeForm = this.formBuilder.group({

      FirstName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      LastName: ["", [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*')]],
      UserName: ["", [Validators.required, Validators.pattern('^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$')]],
      DepartmentName: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      PhoneNumber: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      JoinDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
    });
  }

  // Get Employee  Api Call
  loadEmployee() {

    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
        "/" +
        this.adminId
      )
      .subscribe((data) => {
        console.log("Get Employee page", data);
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

  // Add employee  Modal Api Call
  addEmployee() {
    if (this.addEmployeeForm.invalid) {
      this.markFormGroupTouched(this.addEmployeeForm);
      return;
    }
    let DateJoin = this.pipe.transform(
      this.addEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );

    let obj = {
      firstname: this.addEmployeeForm.value.FirstName,
      lastname: this.addEmployeeForm.value.LastName,
      username: this.addEmployeeForm.value.UserName,
      email: this.addEmployeeForm.value.Email,
      password: this.addEmployeeForm.value.Password,
      confirmpassword: this.addEmployeeForm.value.ConfirmPassword,
      employeeId: this.addEmployeeForm.value.EmployeeID,
      joindate: DateJoin,
      phone: this.addEmployeeForm.value.PhoneNumber,
      adminId: this.adminId,
      department: this.addEmployeeForm.value.DepartmentName,
      designation: this.addEmployeeForm.value.Designation,
      mobile: this.addEmployeeForm.value.mobile,
      role: this.addEmployeeForm.value.role,
      Holidays: this.Holidays,
      Leaves: this.Leaves,
      Clients: this.Clients,
      Projects: this.Projects,
      Tasks: this.Tasks,
      Chats: this.Chats,
      Assets: this.Assets,
      TimingSheets: this.TimingSheets,
      location: this.current_location

    };
    this.http
      .post("http://localhost:8443/admin/allemployees/addemployee", obj)
      .subscribe((data) => {
        console.log("postApi", data);
        this.loadEmployee();
        // $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
      });

    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }

  // to know the date picker changes
  from(data) {
    this.DateJoin = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // edit modal api call
  editEmployee() {
    let id = this.editId;
    let obj = {
      firstname: this.editEmployeeForm.value.FirstName,
      lastname: this.editEmployeeForm.value.LastName,
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
    //console.log("data is", this.Holidays);
    this.http
      .patch("http://localhost:8443/admin/allemployees/update" + "/" + id, obj)
      .subscribe((data) => {
        this.loadEmployee();

      });

    $("#edit_employee").modal("hide");
    this.toastr.success("Employeee Updated sucessfully...!", "Success");
  }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  editEmp(value) {
    this.editId = value;
    alert(value);
    const index = this.lstEmployee.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstEmployee[index];
    //console.log(toSetValues);
    this.editEmployeeForm.setValue({
      FirstName: toSetValues.firstName,
      LastName: toSetValues.lastName,
      UserName: toSetValues.employeeId,
      Email: toSetValues.email,
      // Password: toSetValues.password,
      // ConfirmPassword: toSetValues.password,
      EmployeeID: toSetValues.employeeId,
      JoinDate: toSetValues.joindate,
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
        //console.log(data);
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
    // //console.log("bbbbbbb", id)
    sessionStorage.setItem("empid", id);
    this.router.navigate(["/layout/employees/employeeprofile"]);
  }
  // ngOnDestroy(): void {

  //   this.dtTrigger.unsubscribe();
  // }

}
