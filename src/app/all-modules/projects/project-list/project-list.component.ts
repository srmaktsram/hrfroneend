import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit, OnDestroy {
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
  public rows = [];
  public client = [];
  public srch = [];
  public multImages = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public user_type = sessionStorage.getItem("user_type");
  projectswrite: string;
  projectsWrite: string;
  projectsWriteSub: string;
  clientIdName: any;
  clientName: string;
  clientId: any;
 

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private allModulesService: AllModulesService,
    private _snackBar: MatSnackBar
  ) {
    this.adminId=sessionStorage.getItem("adminId");
    this.projectswrite=sessionStorage.getItem("projectswrite");
    this.projectsWrite = sessionStorage.getItem("projectsWrite");
    this.projectsWriteSub = sessionStorage.getItem("projectsWriteSub");

    this.getClients();
  }
  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.getProjects();
    //Add Projects form
    this.addProjectForm = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      projectDescription: ["", [Validators.required]],
      projectStartDate: ["", [Validators.required]],
      projectEndDate: ["", [Validators.required]],
      projectPriority: ["", [Validators.required]],
      rate: [""],
      client: [""],
    });

    //Edit Projects Form
    this.editProjectForm = this.formBuilder.group({
      editProjectName: ["", [Validators.required]],
      editProjectDescription: ["", [Validators.required]],
      editProjectStartDate: ["", [Validators.required]],
      editProjectEndDate: ["", [Validators.required]],
      editProjectPriority: ["", [Validators.required]],
      rate: [""],
      client: [""],
    });
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
    this.projects = [];
    this.getProjects();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
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
        this.rows = this.projects;
        this.srch = [...this.rows];
      });
  }
  updateStatus(val, id) {
    this.http
      .patch("http://localhost:8443/admin/projects/updateProject" + "/" + id, {
        status: val,
      })
      .subscribe((data: any) => {
        this.getProjects();
      });
    this._snackBar.open("Project updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.multImages = event.target.files;
    }
  }

  priorityStatus(val, id) {
    this.http

      .patch("http://localhost:8443/admin/projects/updateProject" + "/" + id, {
        priority: val,
      })
      .subscribe((data: any) => {
        this.getProjects();
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
      client: toSetValues.client,
      file: toSetValues.file,

    });
  }

  //Create New Project
  public addProject() {
    // let StartDate = this.pipe.transform(
    //   this.addProjectForm.value.projectStartDate,
    //   "dd-MM-yyyy"
    // );
    // let EndDate = this.pipe.transform(
    //   this.addProjectForm.value.projectEndDate,
    //   "dd-MM-yyyy"
    // );
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
    params = params.set("description",this.addProjectForm.value.projectDescription);
    params = params.set("endDate", this.addProjectForm.value.projectEndDate);
    params = params.set("startDate", this.addProjectForm.value.projectStartDate);
    params = params.set("priority", this.addProjectForm.value.projectPriority);
    params = params.set("rate", this.addProjectForm.value.rate);
    params = params.set("client", this.addProjectForm.value.client);
    params = params.set("clientId", this.clientId);


    this.http
      .post("http://localhost:8443/admin/projects/createProject?" + params, fd)
      .subscribe((data: any) => {
        this.getProjects();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    this.addProjectForm.reset();
    $("#create_project").modal("hide");

    this._snackBar.open("Project added sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Save Project
  public saveProject() {
    console.log(
      this.editProjectForm.value.editProjectStartDate,
      this.editProjectForm.value.editProjectEndDate
    );
   
    // let StartDate = this.pipe.transform(
    //   this.editProjectForm.value.editProjectStartDate,
    //   "dd-MM-yyyy"
    // );
    // let EndDate = this.pipe.transform(
    //   this.editProjectForm.value.editProjectEndDate,
    //   "dd-MM-yyyy"
    // );
    var fd = new FormData();
    for (let image of this.multImages) {
      fd.append("files", image);
    }
    
    let params = new HttpParams();
    params = params.set("tempId", this.tempId);
    params = params.set("name", this.editProjectForm.value.editProjectName);
    params = params.set("description",this.editProjectForm.value.editProjectDescription);
    params = params.set("startDate", this.editProjectForm.value.editProjectStartDate);
    params = params.set("endDate", this.editProjectForm.value.editProjectEndDate);
    params = params.set("priority",this.editProjectForm.value.editProjectPriority);
    params = params.set("rate", this.editProjectForm.value.rate);
    params = params.set("client", this.editProjectForm.value.client);
    params = params.set("clientId", this.clientId);


    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProjectFiles?" + params,
        fd
      )
      .subscribe((data: any) => {
        this.getProjects();
        $("#datatable").DataTable().clear();

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    this.editProjectForm.reset();
    $("#edit_project").modal("hide");

    this._snackBar.open("Project updated sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Delete project
  deleteProject() {
    this.http
      .patch(
        "http://localhost:8443/admin/projects/deleteproject" +
          "/" +
          this.tempId,
        { status: 2 }
      )
      .subscribe((data: any) => {
        this.getProjects();
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });

    $("#delete_project").modal("hide");

    this._snackBar.open("Project deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
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
  searchByEmpname(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.client.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
