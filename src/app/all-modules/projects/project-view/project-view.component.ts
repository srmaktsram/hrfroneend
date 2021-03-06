import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { map, mergeMap } from "rxjs/operators";

import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
declare const $: any;
@Component({
  selector: "app-project-view",
  templateUrl: "./project-view.component.html",
  styleUrls: ["./project-view.component.css"],
})
export class ProjectViewComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public lstTasks = [];
  public lstProgress = [];
  public lstCompleted = [];
  public lstInprogress = [];
  public lstHold = [];
  public lstReview = [];
  public multImages: any;
  public leader = [];
  public completeTask;
  public openTask;
  public pipe = new DatePipe("en-US");
  public addProjectForm: FormGroup;
  public editProjectForm: FormGroup;
  public progess: any;
  public projects: any;
  public projectId: any;
  public project: any;
  public projectTitle: String;
  public projectStart: any;
  public projectEnd: any;
  public adminId: any;
  public completedTask: any;
  public projectImage = [];
  public projectFile = [];
  public pendingTas = [];
  public file: string;
  public tasks = [];
  public pendingTask = [];
  public completed = [];
  public users = [];
  public addusers = [];
  public userdata = [];
  public userArr = [];
  public teamLeader: any;
  public user_type = sessionStorage.getItem("user_type");
  public clientIdName: any;
  public clientName: any;
  public clientId: any;

  path: string;
  client: any;
  projectswrite: string;
  projectsWrite: string;
  projectsWriteSub: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.adminId = sessionStorage.getItem("adminId");
    this.projectswrite = sessionStorage.getItem("projectswrite");
    this.projectsWrite = sessionStorage.getItem("projectsWrite");
    this.projectsWriteSub = sessionStorage.getItem("projectsWriteSub");

    this.getClients();
  }

  ngOnInit() {
    this.getInfo();

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

    this.allTasks();
    this.getusers();
  }
  getInfo() {
    this.route.params
      .pipe(
        map((id) => {
          this.projectId = id.id;
          console.log("this is the ROUTE.PARAMS>>>>>>>>>>>", this.projectId);
        }),
        mergeMap(() =>
          this.http.get(
            "http://localhost:8443/admin/projects/getOneproject" +
              "/" +
              this.projectId
          )
        )
      )
      .subscribe((data: any) => {
        this.projects = data;

        console.log("Projects", this.projects);

        this.projectTitle = this.projects.name;
        this.projectImage = this.projects.images;

        this.projectFile = this.projects.files;

        this.projectStart = this.projects.startDate;
        this.projectEnd = this.projects.endDate;

        this.loadTask();
      });
  }
  allTasks() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getTaskproject" +
          "/" +
          this.adminId +
          "/" +
          this.projectId
      )
      .subscribe((data: any) => {
        this.tasks = data.lstTasks;
        // this.pendingTas=data.lstCompleted;
        this.completedTask = data.lstCompleted;
      });
  }

  loadTask() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getTaskproject" +
          "/" +
          this.adminId +
          "/" +
          this.projectId
      )
      .subscribe((data: any) => {
        this.lstTasks = data.lstTasks;

        this.lstProgress = data.lstProgress;
        this.lstCompleted = data.lstCompleted;
        this.lstInprogress = data.lstInprogress;
        this.lstHold = data.lstHold;
        this.lstReview = data.lstReview;
        this.completeTask = this.lstCompleted.length;
        this.openTask = this.lstTasks.length;

        let totalLength =
          this.lstTasks.length +
          this.lstProgress.length +
          this.lstHold.length +
          this.lstInprogress.length +
          this.lstReview.length +
          this.lstCompleted.length;
        let completeLength = this.lstCompleted.length;
        this.progess = ((completeLength / totalLength) * 100).toFixed(1) + "%";

        console.log("<><><><<", this.progess);
      });
  }

  download() {}

  selectImage(event: any) {
    console.log("event>>>>>>>>>>>>>", event.target.file);
    if (event.target.files.length > 0) {
      this.multImages = event.target.file;
    }
  }

  //Edit project
  editProject() {
    let toSetValues = this.projects;
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

  //Save Project
  public saveProject() {
    console.log(
      "this is the pipe<><><><<><><><><",
      this.editProjectForm.value.editProjectStartDate,
      this.editProjectForm.value.editProjectEndDate
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
    for (let pdf of this.multImages) {
      fd.append("file", pdf);
    }
    this.clientIdName = this.editProjectForm.value.client.split(",");
    this.clientName = this.clientIdName[1] + "" + this.clientIdName[2];
    this.clientId = this.clientIdName[0];

    let params = new HttpParams();
    params = params.set("tempId", this.projectId);
    params = params.set("name", this.editProjectForm.value.editProjectName);
    params = params.set("description",this.editProjectForm.value.editProjectDescription);
    params = params.set("endDate", EndDate);
    params = params.set("startDate", StartDate);
    params = params.set("priority",this.editProjectForm.value.editProjectPriority);
    params = params.set("rate", this.editProjectForm.value.rate);
    params = params.set("client", this.editProjectForm.value.client);
    params = params.set("clientname", this.clientName);
    params = params.set("clientId", this.clientId);

    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProjectFiles?" + params,
        fd
      )
      .subscribe((res: any) => {
        console.log("updated",res)
        this.allTasks();
        this.getInfo();
        this.editProjectForm.reset();
        $("#edit_project").modal("hide");
        this._snackBar.open("Project Files updated sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  getClients() {
    this.http
      .get(
        "http://localhost:8443/admin/clients/getDataClient" + "/" + this.adminId
      )
      .subscribe((data: any) => {
        this.client = data;
      });
  }

  getusers() {
    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
          "/" +
          this.adminId
      )
      .subscribe((data: any[]) => {
        this.userdata = data;
        console.log("this is the EMPLOYEE>>>>>>>>", this.userdata);
        this.users = [...this.userdata];
      });
  }

  addUsers(val1, val2, id,profileImagePath) {
    let val = val1 + " " + val2;

    var obj = {
      name: val,
      id: id,
      profileImagePath:profileImagePath
    };

    this.userArr.push(obj);
    console.log("this is the Leader name and id>>>>>", this.userArr);
  }

  addAllTeam() {
    let userDetails = this.userArr;
    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProject" +
          "/" +
          this.projectId,
        { teamMember: userDetails }
      )
      .subscribe((data: any) => {
        this.userArr = [];
        this.getInfo();
        $("#assign_user").modal("hide");
        this._snackBar.open("Project Team updated sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  addLeader(val1, val2, id,profileImagePath) {
    let val = val1 + " " + val2;
    this.teamLeader = {
      name: val,
      id: id,
      profileImagePath:profileImagePath
    };

    this.leader.push(this.teamLeader);
    console.log("this is leader", this.leader);
  }

  addTeamLeader() {
    let teamLeaders = this.leader;
    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProject" +
          "/" +
          this.projectId,
        { projectLeader: teamLeaders }
      )
      .subscribe((data: any) => {
        this.teamLeader = "";
        $("#assign_leader").modal("hide");
        this._snackBar.open("Project Team Leader added sucessfully !", "", {
          duration: 2000,
          panelClass: "notif-success",

          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getInfo();
      });
  }

  filterUser(val) {
    if (val.trim()) {
      this.userdata.splice(0, this.userdata.length);

      let temp = this.users.filter(function (d) {
        val = val.toLowerCase();

        return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.userdata.push(...temp);
    } else {
      this.getusers();
    }
  }

  deletedTask(id) {
    let taskId = id;
    this.http
      .patch(
        "http://localhost:8443/admin/projects/deleteTask" +
          "/" +
          this.projectId +
          "/" +
          taskId,
        {}
      )
      .subscribe((data: any) => {
        this.allTasks();
      });
    this._snackBar.open("Task deleted sucessfully !", "", {
      duration: 2000,
      panelClass: "notif-success",

      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
