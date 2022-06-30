import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup,FormControl, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";

declare const $: any;
@Component({
  selector: "app-task-board",
  templateUrl: "./task-board.component.html",
  styleUrls: ["./task-board.component.css"],
})
export class TaskBoardComponent implements OnInit {
  [x: string]: any;
  public lstTasks =[];
  public lstProgress =[];
  public lstCompleted =[];
  public lstInprogress =[];
  public lstHold =[];
  public lstReview =[];
  public progess:any;
  public adminId:any;
  public url: any = "taskboard";
  public droppedItems: any[] = [];
  public addTaskboardForm: FormGroup;
  public editTaskForm:FormGroup;
  public rows=[];
  public srch=[];
  public tempId:any;
  public pipe=new DatePipe("en-US");
  public getAllLeader=[]
  public leader:String;
  public lead=[];
  public editId:any;
  public teamMember=[];
  public user_type = sessionStorage.getItem("user_type");
  public projectswrite = sessionStorage.getItem("projectswrite");

     public allTasks=[];
  projectId: any;
  projects: any;
  onItemDrop(e: any) {
    // Get the dropped data here

    this.droppedItems.push(e.dragData);
  }

  constructor(
    private _Activatedroute:ActivatedRoute,
    private toastr: ToastrService,
    private http:HttpClient,
    private srvModuleService: AllModulesService,
    private fb:FormBuilder
  ) {
    this.adminId=sessionStorage.getItem("adminId");

    this.getInfo();
    this.getLeader();
    this.getUser();
    
  
   }

  ngOnInit() {

       this.addTaskboardForm=this.fb.group({
         taskName:["",[Validators.required]],
         taskPriority:["",[Validators.required]],
         dueDate:["",[Validators.required]],
         followers:[""]

       })
 
        this.editTaskForm=this.fb.group({
          edittaskName:["",[Validators.required]],
          edittaskPriority:["",[Validators.required]],
          editdueDate:["",[Validators.required]],
          editfollowers:[""]

        })


    this.loadTask();
    
      
      
    
      
      (this.droppedItems = [
        {
          id: 1,
          taskname: "website redesign",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
        {
          id: 2,
          taskname: "Make a wireframe",
          taskpriority: "High",
          duedate: "02-05-2020",
          followers: "Richard deo",
          status: "Active",
        },
      ]);
    if ($('[data-bs-toggle="tooltip"]').length > 0) {
      $('[data-bs-toggle="tooltip"]').tooltip();
    }
  }

      
 getInfo(){

  this._Activatedroute.paramMap.subscribe(params => { 
    this.id = params.get('id'); 
    // console.log("this is params><<><><><><><<>",this.id)
    this.projectId=this.id
    this.http.get("http://localhost:8443/admin/projects/getOneproject"+"/"+this.projectId).subscribe((data:any)=>{
      this.projects = data;


      // console.log("this is getInfo<><><<",this.projects)
    })
    
});

   

 
}











  addTaskboard() {
      let date=this.addTaskboardForm.value.dueDate;
       let Date=this.pipe.transform(date,"dd-mm-yyyy");

    let obj={
      projectId:this.projectId,
      adminId:this.adminId,
      taskName:this.addTaskboardForm.value.taskName,
      taskPriority:this.addTaskboardForm.value.taskPriority,
      dueDate:Date,
      followers:this.addTaskboardForm.value.followers,
    }
  // console.log("this is OBJ<><><><><><><><><><><><><>",obj)
    this.http.post("http://localhost:8443/admin/tasks/createTask",obj).subscribe((data:any)=>{
//  console.log("this is the AddTask bOard",data.data);

//  console.log(data);
 $("#add_task_modal").modal("hide");
 this.loadTask()

    })

   
  }

  onDrop(event: CdkDragDrop<string[]>) {
    // console.log("this is  1<><><><",event.previousContainer.data)
    // console.log("this is  2<><><><", event.container.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex 
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
   

    let obj={
      lstTasks : this.lstTasks,
      lstProgress:this.lstProgress,
     lstCompleted:this.lstCompleted,
     lstInprogress:this.lstInprogress,
      lstHold:this.lstHold,
     lstReview:this.lstReview,

    }
    // console.log("this is the object ",obj);
    let id=this.projectId;
    this.http.patch("http://localhost:8443/admin/projects/updateProject"+"/"+id,obj).subscribe((data:any)=>{
      // console.log("this is project<><><><>",data);
          this.loadTask();
    })
  }

  

  // // Get tasks  Api Call
  loadTask() {
   
    this.http.get("http://localhost:8443/admin/projects/getTaskproject"+"/"+this.adminId+"/"+this.projectId).subscribe((data:any) => {
 
      this.lstTasks = data.lstTasks;
      
      this. lstProgress=data.lstProgress;
     this. lstCompleted=data.lstCompleted;
     this. lstInprogress=data.lstInprogress;
     this. lstHold=data.lstHold;
     this. lstReview=data.lstReview;
      // console.log("this is the Tasks <><><><><><><><><><>",this.allTasks)
      let totalLength=(this.lstTasks.length+ this.lstProgress.length+ this.lstHold.length+this.lstInprogress.length+this.lstReview.length+this.lstCompleted.length)
      let completeLength=this.lstCompleted.length;
      this.progess=((completeLength/totalLength)*100).toFixed(2)+"%";
       
    //  console.log("<><><><<",this.progess)
     
    });
  }
  editTasks(id){
    // alert(id)
    this.tempId=id;
    var index=this.lstTasks.findIndex((item)=>{
      return item.id===id;
    })
    // console.log("thisn is INDEX<><><><><><",index)
    let setData=this.lstTasks[index];
    // console.log("thisn is setData<><><><><><",setData)
    this.editTaskForm.patchValue({
  
      edittaskName:setData.taskName,
      edittaskPriority:setData.taskPriority,
      editdueDate:setData.dueDate,
      editfollowers:setData.followers
    })
  }



  editSaveTask(){
    // alert(this.tempId)
    console.log("this ois the edit form",this.editTaskForm.value)
    let obj={
      taskName:this.editTaskForm.value.edittaskName,
      taskPriority:this.editTaskForm.value.edittaskPriority,
      dueDate:this.editTaskForm.value.editdueDate,
      followers:this.editTaskForm.value.editfollowers
     
    }
    console.log("this is obj",obj)
    this.http.patch("http://localhost:8443/admin/project/updateProjectTask"+"/"+this.projectId+"/"+this.tempId,obj).subscribe((data:any)=>{
      console.log(data)
      
      $("#edit_task_modal").modal("hide");
      this.loadTask()
    })

  }

  deleteTask(_id){
   
    
    let taskId=_id
    // alert(taskId)
    // alert(taskId)
    // this.http.patch("http://localhost:8443/admin/tasks/deleteTask"+"/"+id,{status:2}).subscribe((data:any)=>{
    //   // console.log(data)
    //   this.loadTask();
    // })
    this.http.patch("http://localhost:8443/admin/projects/deleteTask"+"/"+this.projectId+"/"+taskId,{}).subscribe((data:any)=>{
      // console.log(data)
      this.loadTask();
    })
  }


  addLeader(val1,val2){
    let val=val1+" "+val2;
    this.lead.push(val);
    // console.log("this is this.leader<><><><><><><",this.leader)
    
  }
  team(val1,val2){
    let val=val1+" "+val2;
    this.teamMember.push(val);
    // console.log("this is the team member<><<<><<><><><><><>",this.teamMember)

  }
  getUser(){
    this.http.get("http://localhost:8443/admin/users/getAdminUsers"+"/"+this.adminId).subscribe((data:any[])=>{
      this.getAllUser=data
     //  console.log("this is getAllLeader<><><><><><",this.getAllLeader)
     this.rows=this.getAllUser;
     this.srch=[...this.rows]
     // console.log(this.userdata)
     

})

  }

  getLeader(){
    this.http.get("http://localhost:8443/admin/users/getAdminUsers"+"/"+this.adminId).subscribe((data:any[])=>{
       this.getAllLeader=data
      //  console.log("this is getAllLeader<><><><><><",this.getAllLeader)
      this.rows=this.getAllLeader;
      this.srch=[...this.rows]
      // console.log(this.userdata)
      

 })
  }


  filterUser(val){
    // console.log( "this is the Val<><><<><><><><><",val)
    if (val.trim()) {
      this.rows.splice(0, this.rows.length);
      // console.log("this is userData<><<><><><><><><>",this.userdata)
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        // console.log("this is d<><><><><><><><><><>",d.firstName)
        return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
     
      // console.log("loaded",this.userdata)
    } else {
      this.loadTask();
    }
  }

  

  onsubmit() {
    $("#add_task_board").modal("hide");


  }
  onSubmitUser() {
    let teamMember=this.teamMember;
    this.http.patch("http://localhost:8443/admin/projects/updateProject"+"/"+this.projectId,{teamMember:teamMember}).subscribe((data:any)=>{
    //  console.log(data);
   this.teamMember=[];
   $("#assign_user").modal("hide");
      this.getInfo()
    })
    
  }

  onSubmitLeader() {

    let teamLead=this.lead;
  this.http.patch("http://localhost:8443/admin/projects/updateProject"+"/"+this.projectId,{lead:teamLead}).subscribe((data:any)=>{
  //  console.log(data);
 this.lead=[];
 $("#assign_leader").modal("hide");
    this.getInfo()
  })

   
  }



}
