import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { CandidateRoutingModule } from "./candidate-routing.module";
import { CandidateComponent } from "./candidate.component";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
@NgModule({
  declarations: [CandidateComponent, CandidateListComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class CandidateModule {}
