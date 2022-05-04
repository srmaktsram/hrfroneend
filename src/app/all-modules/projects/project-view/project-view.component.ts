import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-project-view",
  templateUrl: "./project-view.component.html",
  styleUrls: ["./project-view.component.css"],
})
export class ProjectViewComponent implements OnInit {
  public projects:any;
  public projectId: any;
  public project: any;
  public projectTitle:String;
  public projectStart:any;
  public projectEnd:any;
  public adminId:any;
  public completedTask:any;

  public tasks=[];
  public pendingTask=[]
  public completed=[]
  public users=[]
  public addusers=[];
  public userdata=[];
  public userArr=[];
  public teamLeader:String;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    
  ) {
    this.adminId=sessionStorage.getItem("adminId");
  }

  ngOnInit() {
   
this.getInfo()

      this.allTasks()
      this.getusers()
    
  }
  getInfo(){
    this.route.params
    .pipe(
      map((id) => {
        // console.log("this is id<><><",id)
        this.projectId = id.id;
      }),
      mergeMap(() => this.http.get("http://localhost:8443/admin/projects/getOneproject"+"/"+this.projectId))
    )
    .subscribe((data:any) => {
      this.projects = data;
      // console.log("this is the <><><><><><><><><><><><><><><>",this.projects)
      this.projectTitle = this.projects.name;
      this.projectStart = this.projects.startDate;
      this.projectEnd = this.projects.endDate;
      
     
    });

  }
  allTasks(){
    this.http.get("http://localhost:8443/admin/projects/getTaskproject"+"/"+this.adminId+"/"+this.projectId).subscribe((data:any)=>{
      this.tasks=data.lstTasks;
      this.completedTask=data.lstCompleted;
      // console.log("all task<><><><><><><><><>,",this.tasks)
    })
   
  }

  

 getusers(){
   this.http.get("http://localhost:8443/admin/users/getAdminUsers"+"/"+this.adminId).subscribe((data:any[])=>{
       
        this.userdata=data;
        this.users=[...this.userdata];
       
        

   })
 }


 addUsers(val1,val2){
 
  
   let val=val1+" "+val2;
   this.teamLeader=val;
  //  console.log( "this is total teamLeader<><><><><><><><><><>",this.teamLeader);
  this.userArr.push(val)
  // console.log("this is the arry of users<><><><<><><><>< ",this.userArr)
 }


 addAllTeam(){
  //  alert(this.projectId)
   let userDetails=this.userArr;
   this.http.patch("http://localhost:8443/admin/projects/updateProject"+"/"+this.projectId,{teamMember:userDetails}).subscribe((data:any)=>{
    //  console.log(data);
     this.userArr=[];
     this.getInfo()
     $("#assign_user").modal("hide");
    
   })
   
  //  console.log("After api call userArr<><><><><><",this.userArr)
 }

 addLeader(val1,val2){
 
  
  let val=val1+" "+val2;
  this.teamLeader=val;
  // console.log( "this is total teamLeader<><><><><><><><><><>",this.teamLeader);
 

}

 addTeamLeader(){
 
  let teamLeaders=this.teamLeader;
  this.http.patch("http://localhost:8443/admin/projects/updateProject"+"/"+this.projectId,{projectLeader:teamLeaders}).subscribe((data:any)=>{
    // console.log(data);
    this.teamLeader="";
    $("#assign_leader").modal("hide");
    this.getInfo()
  })
  
  // console.log("After api call teamLeader<><><><><><",this.teamLeader)

 }







 filterUser(val){
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





  deletedTask(id){
    
     let taskId=id;
    this.http.patch("http://localhost:8443/admin/projects/deleteTask"+"/"+this.projectId+"/"+taskId,{}).subscribe((data:any)=>{
      // console.log(data)
      this.allTasks();
    })
  }


}
