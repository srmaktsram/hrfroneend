import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-clients-profile",
  templateUrl: "./clients-profile.component.html",
  styleUrls: ["./clients-profile.component.css"],
})
export class ClientsProfileComponent implements OnInit {
  public allClients = [];
  public client: any;
  public clientData = [];
  public allProjects = [];
  public clientName: any;
  public clientId;
  public adminId;
  public allTasks = [];
  public pendingTasks = [];
  public completedTasks = [];
  public project: any;
  pendingTask: any;

  constructor(
    private allModulesService: AllModulesService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.clientId = sessionStorage.getItem("clientId");
  }

  ngOnInit() {
    this.http
      .get(
        "http://localhost:8443/admin/clients/getClients" + "/" + this.clientId
      )
      .subscribe((data: any) => {
        this.client = data;

        this.projects();
      });
  }
  projects() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminproject" +
          "/" +
          this.adminId
      )
      .subscribe((res: any) => {
        this.allProjects = res;

        this.project = this.allProjects.filter(
          (name) => name.clientId == this.clientId
        );

        this.project.map((item) => {
          console.log(item);
          if (item.lstTasks) {
            item.lstTasks.map((data) => {
              this.pendingTasks.push(data);
              this.allTasks.push(data);
            });
          }

          if (item.lstCompleted) {
            item.lstCompleted.map((data) => {
              this.completedTasks.push(data);
              this.allTasks.push(data);
            });
          }

          if (item.lstProgress) {
            item.lstProgress.map((data) => {
              this.allTasks.push(data);
            });
          }
          if (item.lstInprogress) {
            item.lstInprogress.map((data) => {
              this.allTasks.push(data);
            });
          }
          if (item.lstHold) {
            item.lstHold.map((data) => {
              this.allTasks.push(data);
            });
          }
          if (item.lstReview) {
            item.lstReview.map((data) => {
              this.allTasks.push(data);
            });
          }
        });
      });
  }
}
