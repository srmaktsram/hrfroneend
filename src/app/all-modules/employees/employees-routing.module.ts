import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { EmployeePageContentComponent } from "./all-employees/employee-page-content/employee-page-content.component";
import { EmployeeListComponent } from "./all-employees/employee-list/employee-list.component";
import { EmployeeProfileComponent } from "./all-employees/employee-profile/employee-profile.component";
import { HolidaysComponent } from "./holidays/holidays.component";
import { LeavesAdminComponent } from "./leaves-admin/leaves-admin.component";
import { LeavesEmployeeComponent } from "./leaves-employee/leaves-employee.component";
import { LeaveSettingsComponent } from "./leave-settings/leave-settings.component";
import { AttendanceAdminComponent } from "./attendance-admin/attendance-admin.component";
import { AttendanceEmployeeComponent } from "./attendance-employee/attendance-employee.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { DesignationComponent } from "./designation/designation.component";
import { TimesheetComponent } from "./timesheet/timesheet.component";
import { OvertimeComponent } from "./overtime/overtime.component";
import { AuthGuardEmployee } from "src/app/core/auth/auth-guard.service";
import { AuthGuardAdmin } from "src/app/core/auth/auth-guard-admin.service";
const routes: Routes = [
  {
    path: "",
    component: EmployeesComponent,
    children: [
      {
        path: "employeepage",
        component: EmployeePageContentComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "employeelist",
        component: EmployeeListComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "employeeprofile",
        component: EmployeeProfileComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "holidays",
        component: HolidaysComponent,
        // canActivate: [AuthGuardAdmin],
      },
      {
        path: "adminleaves",
        component: LeavesAdminComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "employeeleaves",
        component: LeavesEmployeeComponent,
        canActivate: [AuthGuardEmployee],
      },
      {
        path: "leavesettings",
        component: LeaveSettingsComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "attendanceadmin",
        component: AttendanceAdminComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "attendanceemployee",
        component: AttendanceEmployeeComponent,
        canActivate: [AuthGuardEmployee],
      },
      {
        path: "departments",
        component: DepartmentsComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "designation",
        component: DesignationComponent,
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "timesheet",
        component: TimesheetComponent,
        // canActivate: [AuthGuardAdmin]
        
      },
      
      {
        path: "overtime",
        component: OvertimeComponent,
        canActivate: [AuthGuardAdmin],
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
