import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { EmployeePageContentComponent } from './all-employees/employee-page-content/employee-page-content.component';
import { EmployeeListComponent } from './all-employees/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './all-employees/employee-profile/employee-profile.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakTime, OverTime, ProductionPipe } from 'src/assets/pipes/employeeattandance';
import { MatchDate } from 'src/assets/pipes/checkDate';
// import { NotificationService } from 'src/app/services/notification.service';
import { HeaderComponent } from 'src/app/header/header.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [MatchDate, EmployeesComponent, AllEmployeesComponent, EmployeePageContentComponent, EmployeeListComponent, EmployeeProfileComponent, HolidaysComponent, LeavesAdminComponent, LeavesEmployeeComponent, LeaveSettingsComponent, AttendanceAdminComponent, AttendanceEmployeeComponent, DepartmentsComponent, DesignationComponent, TimesheetComponent, OvertimeComponent, ProductionPipe, BreakTime, OverTime],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    SharingModule,
    ReactiveFormsModule,
    PickListModule,
    EmployeesRoutingModule, PickListModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    MatSelectModule,
    MatFormFieldModule,


  ],
  providers:[HeaderComponent]
})

export class EmployeesModule { }
