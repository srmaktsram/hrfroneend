import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/components/validators/mid_whitespace";

declare const $: any;
@Component({
  selector: "app-user-main",
  templateUrl: "./user-main.component.html",
  styleUrls: ["./user-main.component.css"],
})
export class UserMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "users";
  public allUsers: any = [];
  public addUsers: FormGroup;
  public check: any;
  public editUsers: FormGroup;
  public Holidays = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false }
  ];
  public Employee = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false }
  ];
  public Leaves = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false }
  ];
  public Events = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false }
  ]




  public editId: any;
  public tempId: any;
  public adminId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.adminId = sessionStorage.getItem("adminId");

  }
  public initializeArray() {
    this.Holidays = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false }
    ];
    this.Employee = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false }
    ];
    this.Leaves = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false }
    ];
    this.Events = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false }
    ]

  }

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getUsers();

    // Add Provident Form Validation And Getting Values

    this.addUsers = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      addUserName: ["", [Validators.required, Validators.pattern("^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$")]],
      addEmail: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      addRole: ["", [Validators.required]],
      addCompany: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    // Edit Provident Form Validation And Getting Values

    this.editUsers = this.formBuilder.group({
      editUsersName: ["", [Validators.required, Validators.pattern("^(?=.{3,15}$)(?!.*[._-]{2})[a-z][a-z0-9._-]*[a-z0-9]$")]],
      editEmail: ["", [Validators.required, Validators.email, WhiteSpaceValidator.noWhiteSpace]],
      editRole: ["", [Validators.required]],
      editCompany: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z'-]+([ A-Za-z][A-Za-z'-]+)*")]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.allUsers = [];
    this.getUsers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getUsers() {
    this.http.get("http://localhost:8443/admin/users/getAdminUsers" + "/" + this.adminId).subscribe((data: any) => {
      // console.log("get Data >>>>>>>>>>>>>>>>>>>>>",data);
      this.allUsers = data;
      this.rows = this.allUsers;
      this.srch = [...this.rows];
    });
  }



  //////////////password checking///////////////
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Add Provident Modal Api Call

  addUsersSubmit() {
    console.log(this.addUsers.status)
    if (this.addUsers.valid) {
      let obj = {
        adminId: this.adminId,
        name: this.addUsers.value.addUserName,
        designation: "Web Designer",
        email: this.addUsers.value.addEmail,
        role: this.addUsers.value.addRole,
        company: this.addUsers.value.addCompany,
        firstName: this.addUsers.value.firstName,
        lastName: this.addUsers.value.lastName,
        password: this.addUsers.value.password,
        confirmPassword: this.addUsers.value.confirmPassword,
        phone: this.addUsers.value.phone,
        holidays: this.Holidays,
        employee: this.Employee,
        leaves: this.Leaves,
        events: this.Events
      }
      console.log("this is the obj>>>>>>>>", obj)

      this.http.post("http://localhost:8443/admin/users/createUsers", obj).subscribe((data: any) => {
        console.log("POST DATA>>>>>>>>>>>>>", data);
        this.getUsers();

        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

      $("#add_user").modal("hide");
      this.addUsers.reset();
      this.toastr.success("Users is added", "Success");
    }
    else {
      alert("else")
      this.markFormGroupTouched(this.addUsers);
      this.toastr.warning("Mandatory fields required", "");
      return;

    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editUsers.valid) {
      let obj = {
        name: this.editUsers.value.editUsersName,
        designation: "Android Developer",
        email: this.editUsers.value.editEmail,
        company: this.editUsers.value.editCompany,
        role: this.editUsers.value.editRole,

        firstName: this.editUsers.value.firstName,
        lastName: this.editUsers.value.lastName,
        password: this.editUsers.value.password,
        confirmPassword: this.editUsers.value.confirmPassword,
        phone: this.editUsers.value.phone,
        holidays: this.Holidays,
        employee: this.Employee,
        leaves: this.Leaves,
        event: this.Events,
      };
      this.http.patch("http://localhost:8443/admin/users/updateUsers" + "/" + this.editId, obj).subscribe((data: any) => {
        // console.log("updateData>>>>>>>>>>>>>>>>>>>",data);
        this.getUsers();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

      $("#edit_user").modal("hide");
      this.toastr.success("Users is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allUsers.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allUsers[index];
    // console.log("ToSetValue>>>>>>>>>>>>>>>",toSetValues);
    this.editUsers.patchValue({
      editUsersName: toSetValues.name,
      editEmail: toSetValues.email,
      editRole: toSetValues.role,
      editCompany: toSetValues.company,
      firstName: toSetValues.firstName,
      lastName: toSetValues.lastName,
      password: toSetValues.password,
      confirmPassword: toSetValues.confirmPassword,
      phone: toSetValues.phone,
    });
    this.Holidays = toSetValues.holidays;

    this.Employee = toSetValues.employee;

    this.Leaves = toSetValues.leaves;

    this.Events = toSetValues.events;

  }

  // Delete Provident Modal Api Call

  deleteUsers() {
    this.http.patch("http://localhost:8443/admin/users/deleteUsers" + "/" + this.tempId, { status: 2 }).subscribe((data: any) => {
      // console.log("deleteData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);
      this.getUsers();
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });

    $("#delete_user").modal("hide");
    this.toastr.success("Users is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.company.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchRole(val) {
    this.rows.splice(0, this.rows.length);
    this.srch.map((item) => {
      if (item.designation === val) {
        this.rows.push(item);
      }

    })



  }

  /////////////Create function///////////////////////////////////////////
  checkEmployee(event, val) {


    if (val == 0) {
      if (event.target.checked == true) {

        this.Employee[0].read = true;

      } else {
        this.Employee[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        this.Employee[1].write = true;
      } else {
        this.Employee[1].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        this.Employee[2].create = true;
      } else {
        this.Employee[2].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        this.Employee[3].delete = true;
      } else {
        this.Employee[3].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        this.Employee[4].import = true;
      } else {
        this.Employee[4].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        this.Employee[5].export = true;
      } else {
        this.Employee[5].export = false;
      }
    }
  }

  checkHolidays(event, val) {

    if (val == 0) {
      if (event.target.checked == true) {
        this.Holidays[0].read = true;
      } else {
        this.Holidays[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {

        this.Holidays[1].write = true;
      } else {

        this.Holidays[1].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {

        this.Holidays[2].create = true;
      } else {

        this.Holidays[2].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {

        this.Holidays[3].delete = true;
      } else {

        this.Holidays[3].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {

        this.Holidays[4].import = true;
      } else {

        this.Holidays[4].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {

        this.Holidays[5].export = true;
      } else {

        this.Holidays[5].export = false;
      }
    }
  }

  checkLeaves(event, val) {

    if (val == 0) {
      if (event.target.checked == true) {

        this.Leaves[0].read = true;
      } else {

        this.Leaves[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {

        this.Leaves[1].write = true;
      } else {

        this.Leaves[1].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {

        this.Leaves[2].create = true;
      } else {

        this.Leaves[2].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {

        this.Leaves[3].delete = true;
      } else {

        this.Leaves[3].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {

        this.Leaves[4].import = true;
      } else {

        this.Leaves[4].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {

        this.Leaves[5].export = true;
      } else {

        this.Leaves[5].export = false;
      }
    }
  }

  checkEvents(event, val) {

    if (val == 0) {
      if (event.target.checked == true) {

        this.Events[0].read = true;
      } else {

        this.Events[0].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {

        this.Events[1].write = true;
      } else {

        this.Events[1].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {

        this.Events[2].create = true;
      } else {

        this.Events[2].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {

        this.Events[3].delete = true;
      } else {

        this.Events[3].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {

        this.Events[4].import = true;
      } else {

        this.Events[4].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {

        this.Events[5].export = true;
      } else {

        this.Events[5].export = false;
      }
    }
  }
















  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
