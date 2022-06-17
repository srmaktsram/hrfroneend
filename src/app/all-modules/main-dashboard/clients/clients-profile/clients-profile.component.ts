import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AllModulesService } from "src/app/all-modules/all-modules.service";

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
    this.adminId = sessionStorage.getItem("adminId");
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map((id) => {
          this.clientId = id.id;
        }),
        mergeMap(() =>
          this.http.get(
            "http://localhost:8443/admin//clients/getDataClient" +
              "/" +
              this.adminId
          )
        )
      )
      .subscribe((data: any) => {
        this.allClients = data;

        this.clientData = this.allClients.filter(
          (client) => client.id == this.clientId
        );

        this.client = this.clientData[0];

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
