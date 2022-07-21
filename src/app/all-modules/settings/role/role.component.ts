import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.css"],
})
export class RoleComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public url: any = "roles";
  roleId;
  public allroles: any = [];
  public addRoles: FormGroup;
  public editRoles: FormGroup;
  public editId: any;
  public tempId: any;
  public adminId = sessionStorage.getItem("adminId");
  employee: any;
  holiday: any;
  leaves: any;
  events: any;
  chat: any;
  jobs: any;
  Employee = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
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
  Events = [
    { id: 0, read: false },
    { id: 1, write: false },
    { id: 2, create: false },
    { id: 3, delete: false },
    { id: 4, import: false },
    { id: 5, export: false },
  ];
  user_type: string;
  settingsWrite: string;
  settingsWriteSub: string;

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
        private _snackBar: MatSnackBar,

    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.settingsWrite = sessionStorage.getItem("settingsWrite");
    this.settingsWriteSub = sessionStorage.getItem("settingsWriteSub");
  }

  public initializeArray() {
    this.Employee = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
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
    this.Events = [
      { id: 0, read: false },
      { id: 1, write: false },
      { id: 2, create: false },
      { id: 3, delete: false },
      { id: 4, import: false },
      { id: 5, export: false },
    ];
  }

  ngOnInit() {
    this.getRoles();

    // Add Provident Form Validation And Getting Values

    this.addRoles = this.formBuilder.group({
      addRoleName: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editRoles = this.formBuilder.group({
      editRoleName: ["", [Validators.required]],
    });
  }

  getRoles() {
    this.http
      .get(
        "http://localhost:8443/admin/roles/getRolesAndPermissions" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.allroles = data;
        this.roleId = this.allroles[0].id;
        this.getNotifications(this.allroles[0].id);
      });
  }

  // Add Provident Modal Api Call

  addRolesSubmit() {
    this.initializeArray();
    if (this.addRoles.valid) {
      let adminId = this.adminId;
      let obj = {
        roleName: this.addRoles.value.addRoleName,
        adminId,
        Employee: this.Employee,
        Holidays: this.Holidays,
        Leaves: this.Leaves,
        Events: this.Events,
      };
      this.http
        .post(
          "http://localhost:8443/admin/roles/createRolesAndPermissions",
          obj
        )
        .subscribe((data) => {
          this.getRoles();
        });
      $("#add_role").modal("hide");
      this.addRoles.reset();

      this._snackBar.open("Roles added sucessfully !", "", {
        duration: 2000,
        panelClass: "notif-success",

        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  // Edit Provident Modal Api Call

  editRolesSubmit() {
    let id = this.editId;
    let obj = {
      roleName: this.editRoles.value.editRoleName,
      id: this.editId,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/roles/updateRolesAndPermissions" +
          "/" +
          id,
        obj
      )
      .subscribe((data1) => {
        this.getRoles();
      });
    $("#edit_role").modal("hide");

    this._snackBar.open("Roles updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  edit(value) {
    this.editId = value;
    const index = this.allroles.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allroles[index];
    this.editRoles.setValue({
      editRoleName: toSetValues.roleName,
    });
  }

  // Delete Provident Modal Api Call

  deleteRoles() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/roles/deleteRolesAndPermissions" +
          "/" +
          id,
        obj
      )
      .subscribe((data) => {
        this.getRoles();
        $("#delete_role").modal("hide");

        this._snackBar.open("Roles deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  /////
  editNotifications(key, val) {
    let data = val.target.checked;
    this.http
      .patch(
        "http://localhost:8443/admin/permissions/updateRolesAndPermissions" +
          "/" +
          this.adminId +
          "/" +
          this.roleId,
        { key, data }
      )
      .subscribe((data: any) => {
        this.getNotifications(data.id);
      });
  }
  getNotifications(roleId) {
    this.http
      .get(
        "http://localhost:8443/admin/permissions/getRolesAndPermissions" +
          "/" +
          this.adminId +
          "/" +
          roleId
      )
      .subscribe((data: any) => {
        this.employee = data.notification.employee;
        this.holiday = data.notification.holidays;
        this.leaves = data.notification.leaves;
        this.events = data.notification.events;
        this.chat = data.notification.chat;
        this.jobs = data.notification.jobs;
        this.Employee = data.Employee;
        this.Holidays = data.Holidays;
        this.Leaves = data.Leaves;
        this.Events = data.Events;
      });
  }

  //Employee
  checkCheckBoxvalueEmployee(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].read = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].write = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].create = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].delete = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].import = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].export = true;
      } else {
        const objIndex = this.Employee.findIndex((obj) => obj.id == val);
        this.Employee[objIndex].export = false;
      }
    }
    let employee = this.Employee;
    this.http
      .patch(
        "http://localhost:8443/admin/permissions/updateCheckbox" +
          "/" +
          this.adminId +
          "/" +
          this.roleId,
        { Employee: employee }
      )
      .subscribe((data: any) => {
        this.getNotifications(data.id);
      });
    this._snackBar.open("Checkbox updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /////// Holiday
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
    let holidays = this.Holidays;
    this.http
      .patch(
        "http://localhost:8443/admin/permissions/updateCheckbox" +
          "/" +
          this.adminId +
          "/" +
          this.roleId,
        { Holidays: holidays }
      )
      .subscribe((data: any) => {
        this.getNotifications(data.id);
      });
    this._snackBar.open("Checkbox Holiday updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ///Leaves
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
    let leave = this.Leaves;
    this.http
      .patch(
        "http://localhost:8443/admin/permissions/updateCheckbox" +
          "/" +
          this.adminId +
          "/" +
          this.roleId,
        { Leaves: leave }
      )
      .subscribe((data: any) => {
        this.getNotifications(data.id);
      });
  }
  ///Events
  checkCheckBoxvalueEvents(event, val) {
    if (val == 0) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].read = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].read = false;
      }
    } else if (val == 1) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].write = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].write = false;
      }
    } else if (val == 2) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].create = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].create = false;
      }
    } else if (val == 3) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].delete = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].delete = false;
      }
    } else if (val == 4) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].import = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].import = false;
      }
    } else if (val == 5) {
      if (event.target.checked == true) {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].export = true;
      } else {
        const objIndex = this.Events.findIndex((obj) => obj.id == val);
        this.Events[objIndex].export = false;
      }
    }
    let even = this.Events;
    this.http
      .patch(
        "http://localhost:8443/admin/permissions/updateCheckbox" +
          "/" +
          this.adminId +
          "/" +
          this.roleId,
        { Events: even }
      )
      .subscribe((data: any) => {
        this.getNotifications(data.id);
      });
  }
}
