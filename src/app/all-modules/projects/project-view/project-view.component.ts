import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { map, mergeMap } from "rxjs/operators";

import { DatePipe } from "@angular/common";
import { HttpClient, HttpParams } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-project-view",
  templateUrl: "./project-view.component.html",
  styleUrls: ["./project-view.component.css"],
})
export class ProjectViewComponent implements OnInit {
  public lstTasks =[];
  public lstProgress =[];
  public lstCompleted =[];
  public lstInprogress =[];
  public lstHold =[];
  public lstReview =[];
  public multImages=[];
  public completeTask;
  public openTask;
  public pipe = new DatePipe("en-US");
  public addProjectForm: FormGroup;
  public editProjectForm: FormGroup;
  public progess:any;
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
  public pendingTas=[];
  public file: string;
  public tasks = [];
  public pendingTask = [];
  public completed = [];
  public users = [];
  public addusers = [];
  public userdata = [];
  public userArr = [];
  public teamLeader: String;
  path: string;
  client: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.adminId = sessionStorage.getItem("adminId");
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
      editaddTeamMembers: [""],
      editProjectId: [""],
      projectLeader:[""],
      rate: [""],
      client:[""],
     
    });

    this.allTasks();
    this.getusers();
    
  }
  getInfo() {
    this.route.params
      .pipe(
        map((id) => {
          this.projectId = id.id;
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

        console.log("this is the main<><><>>>>>>>>>>>>>>>>>",this.projects)

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
        this.tasks = data.lstTasks
        // this.pendingTas=data.lstCompleted;
        this.completedTask = data.lstCompleted;
      });
  }


  loadTask() {
   
    this.http.get("http://localhost:8443/admin/projects/getTaskproject"+"/"+this.adminId+"/"+this.projectId).subscribe((data:any) => {
 
      this.lstTasks = data.lstTasks;
      
      this. lstProgress=data.lstProgress;
     this. lstCompleted=data.lstCompleted;
     this. lstInprogress=data.lstInprogress;
     this. lstHold=data.lstHold;
     this. lstReview=data.lstReview;
     this.completeTask=this.lstCompleted.length;
     this.openTask=this.lstTasks.length;
      
      let totalLength=(this.lstTasks.length+ this.lstProgress.length+ this.lstHold.length+this.lstInprogress.length+this.lstReview.length+this.lstCompleted.length)
      let completeLength=this.lstCompleted.length;
      this.progess=((completeLength/totalLength)*100).toFixed(1)+"%";
       
     console.log("<><><><<",this.progess)
     
    });
  }


  download(){
    
  }


  
 selectImage(event:any){
   if(event.target.files.length > 0){
     
  this.multImages = event.target.files;
   
   
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
      editaddTeamMembers: toSetValues.teamMember,
      editProjectId: toSetValues.projectId,
      rate:  toSetValues.rate,
      client: toSetValues.client,
      file:toSetValues.file,
      projectLeader:toSetValues.projectLeader
    });
  }

  //Save Project
  public saveProject() {
    console.log("this is the pipe<><><><<><><><><", this.editProjectForm.value.editProjectStartDate,this.editProjectForm.value.editProjectEndDate,)
    let StartDate = this.pipe.transform(
      this.editProjectForm.value.editProjectEndDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.editProjectForm.value.editProjectEndDate,
      "dd-MM-yyyy"
    );

    var fd=new FormData();
    for(let image of this.multImages){
    fd.append("files", image,)
    }
  let params=new HttpParams();
    params=params.set("tempId",this.projectId)
    params=params.set( "name", this.editProjectForm.value.editProjectName,);
    params=params.set( "description", this.editProjectForm.value.editProjectDescription,);
    params=params.set( "endDate", EndDate,);
    params=params.set( "startDate", StartDate,);
    params=params.set("priority", this.editProjectForm.value.editProjectPriority,);
    params=params.set( "teamMember", this.editProjectForm.value.editaddTeamMembers,);
    params=params.set("projectId", this.editProjectForm.value.editProjectPriority,);
    params=params.set("rate",this.editProjectForm.value.rate,);
    params=params.set("client", this.editProjectForm.value.client,);
   
   

    this.http
      .patch(
        "http://localhost:8443/admin/projects/updateProjectFiles?" +params,fd
      )
      .subscribe((res: any) => {
        this.allTasks();
        this.getInfo();
        this.editProjectForm.reset();
        $("#edit_project").modal("hide");
      });
  }
  
  getClients(){
    this.http.get("http://localhost:8443/admin/clients/getDataClient"+"/"+this.adminId).subscribe((data:any)=>{
    this.client=data
    })
  }



  getusers() {
    this.http
      .get(
        "http://localhost:8443/admin/users/getAdminUsers" + "/" + this.adminId
      )
      .subscribe((data: any[]) => {
        this.userdata = data;
        this.users = [...this.userdata];
      });
  }

  addUsers(val1, val2) {
    let val = val1 + " " + val2;
    this.teamLeader = val;

    this.userArr.push(val);
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
      });
  }

  addLeader(val1, val2) {
    let val = val1 + " " + val2;
    this.teamLeader = val;
  }

  addTeamLeader() {
    let teamLeaders = this.teamLeader;
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
  }
}
