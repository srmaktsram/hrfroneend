import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

declare const $: any;
@Component({
  selector: "app-project-content",
  templateUrl: "./project-content.component.html",
  styleUrls: ["./project-content.component.css"],
})
export class ProjectContentComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public projects = [];
  public addProjectForm: FormGroup;
  public editProjectForm: FormGroup;
  public tempId: any;
  public adminId: any;
  public employeeId: any;
  public teamMembers=[];
  public rows = [];
  public srch = [];
  public client = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  designations: any;
  data: Object;
  clientsData: any;
  public multImages = [];
  public wayData: any;
  public path: any;
  bindTrue = true;
  public clientIdName: any;
  public clientName: any;
  public clientId: any;
  progess: string;
  projectswrite: string;
  user_type: string;
  projectsWrite: string;
  projectsWriteSub: string;
  public dataArray: any;
  TEAMMEM: any;
  public newlength: any;
  constructor(
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.employeeId = sessionStorage.getItem("employeeId");
    this.projectswrite = sessionStorage.getItem("projectswrite");
    this.user_type = sessionStorage.getItem("user_type");
    this.projectsWrite = sessionStorage.getItem("projectsWrite");
    this.projectsWriteSub = sessionStorage.getItem("projectsWriteSub");


    this.getClients();
  }
  
  ngOnInit() {
    $(document).ready(function () {
      $('[data-bs-toggle="tooltip"]').tooltip();
    });
    this.getProjects();
    //Add Projects form
    this.addProjectForm = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      projectDescription: ["", [Validators.required]],
      projectStartDate: ["", [Validators.required]],
      projectEndDate: ["", [Validators.required]],
      projectPriority: [""],
      rate: [""],
      client: [""],
    });

    //Edit Projects Form
    this.editProjectForm = this.formBuilder.group({
      editProjectName: [""],
      editProjectDescription: [""],
      editProjectStartDate: [""],
      editProjectEndDate: [""],
      editProjectPriority: [""],
      rate: [""],
      client: [""],
    });
  }

  getProjects() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminproject" +
          "/" +
          this.adminId
      )
      .subscribe((data: any) => {
        this.projects = data;
        console.log(this.projects,"All Projects")
      

        this.dtTrigger.next();
        this.rows = this.projects;
        this.srch = [...this.rows];
      });
  }

  ///////// shows  clients ///////

  getClients() {
    this.http
      .get(
        "http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId
      )
      .subscribe((data: any) => {
        this.client = data;
        console.log(this.client, "jhgsadjagdgsjh>>>>>>>>>>>");
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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.multImages = event.target.files;
    }
  }

  currentClient: any;

  //Create New Project
  public addProject() {
    if (this.addProjectForm.invalid) {
      this.markFormGroupTouched(this.addProjectForm);
      return;
    }
    let StartDate = this.pipe.transform(
      this.addProjectForm.value.projectStartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.addProjectForm.value.projectEndDate,
      "dd-MM-yyyy"
    );
    var fd = new FormData();
    for (let image of this.multImages) {
      fd.append("files", image);
    }
    this.clientIdName = this.addProjectForm.value.client.split(",");
    this.clientName = this.clientIdName[1] + "" + this.clientIdName[2];
    this.clientId = this.clientIdName[0];

    let params = new HttpParams();
    params = params.set("adminId", this.adminId);
    params = params.set("name", this.addProjectForm.value.projectName);
    params = params.set(
      "description",
      this.addProjectForm.value.projectDescription
    );
    params = params.set("endDate", EndDate);
    params = params.set("startDate", StartDate);
    params = params.set("priority", this.addProjectForm.value.projectPriority);
    params = params.set("rate", this.addProjectForm.value.rate);
    params = params.set("clientName", this.clientName);
    params = params.set("clientId", this.clientId);
    console.log(
      this.clientId,
      "id client>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    this.http
      .post("http://localhost:8443/admin/projects/createProject?" + params, fd)
      .subscribe((res: any) => {
        console.log(res, "LLLLLL");
        console.log("POST API PROJECT<><><><><><><", res);

        this.getProjects();
        this.addProjectForm.reset();
        $("#create_project").modal("hide");
        this.toastr.success("Project added sucessfully...!", "Success");
        this._snackBar.open("Client updated sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  //Edit project
  editProject(id: any) {
    this.tempId = id;

    const index = this.projects.findIndex((item) => {
      return item.projectId === id;
    });
    let toSetValues = this.projects[index];
    this.editProjectForm.patchValue({
      editProjectName: toSetValues.name,
      editProjectDescription: toSetValues.description,
      editProjectEndDate: toSetValues.endDate,
      editProjectStartDate: toSetValues.startDate,
      editProjectPriority: toSetValues.priority,
      rate: toSetValues.rate,
      client:this.editProjectForm.value.client,
      file: this.editProjectForm.value.file,
    });
    
    console.log(toSetValues,"aaaa")
  }

  //Save Project
  public saveProject() {
    console.log(
      this.editProjectForm.value.editProjectStartDate,
      this.editProjectForm.value.editProjectEndDate,"date on edit grid"
    );
    let StartDate = this.pipe.transform(
      this.editProjectForm.value.editProjectStartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.editProjectForm.value.editProjectEndDate,
      "dd-MM-yyyy"
    );

    var fd = new FormData();
    for (let image of this.multImages) {
      fd.append("files", image);
    }

    this.clientIdName = this.editProjectForm.value.client.split(",");
    this.clientName = this.clientIdName[1] + "" + this.clientIdName[2];
    this.clientId = this.clientIdName[0];
    let params = new HttpParams();
    params = params.set("tempId", this.tempId);
    params = params.set("name", this.editProjectForm.value.editProjectName);
    params = params.set(
      "description",
      this.editProjectForm.value.editProjectDescription
    );
    params = params.set("endDate", EndDate);
    params = params.set("startDate", StartDate);
    params = params.set(
      "priority",
      this.editProjectForm.value.editProjectPriority
    );
    params = params.set("rate", this.editProjectForm.value.rate);
    params = params.set("clientname", this.clientName);
    params = params.set("clientId", this.clientId);

    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProjectFiles?" + params,
        fd
      )
      .subscribe((res: any) => {
        this.getProjects();
        this.editProjectForm.reset();
        $("#edit_project").modal("hide");

        this.toastr.success("Project updated sucessfully...!", "Success");
        this._snackBar.open("Client updated sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  //Delete project
  public deleteProject() {
    this.http
      .patch(
        "http://localhost:8443/admin/projects/deleteproject" +
          "/" +
          this.tempId,
        {}
      )
      .subscribe((res: any) => {
        this.getProjects();
        $("#delete_project").modal("hide");

        this._snackBar.open("Project deleted sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
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
  searchByEmpname(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.client.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  // searchByDesignation(val) {
  //   this.rows.splice(0, this.rows.length);
  //   let temp = this.srch.filter(function (d) {
  //     val = val.toLowerCase();
  //     return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows.push(...temp);
  // }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
