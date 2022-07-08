import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardAdmin } from "../core/auth/auth-guard-admin.service";
import { AuthGuardAffiliate } from "../core/auth/auth-guard-affiliate.service";
import { AuthGuardClient } from "../core/auth/auth-guard-client.service";
import { AuthGuardMainAdmin } from "../core/auth/auth-guard-mainadmin.service";
import { AuthGuardSubAdmin } from "../core/auth/auth-guard-subadmin.service";
// import { AuthGuard } from "../core/auth/auth-guard.service";
import { AllModulesComponent } from "./all-modules.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AllModulesComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "apps",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
        canActivate: [AuthGuardAdmin],
      },

      {
        path: "mainadmin",
        loadChildren: () =>
          import("./main-dashboard/main-dashboard.module").then(
            (m) => m.MainDashboardModule
          ),
        canActivate: [AuthGuardMainAdmin, AuthGuardSubAdmin],
      },

      {
        path: "client",
        loadChildren: () =>
          import("./client-dashboard/clients.module").then(
            (m) => m.ClientsDashboardModule
          ),
        canActivate: [AuthGuardClient],
      },
      {
        path: "affiliates",
        loadChildren: () =>
          import("./affiliate-dashboard/affiliate-dashboard.module").then(
            (m) => m.AffiliateModule
          ),
        canActivate: [AuthGuardAffiliate],
      },
      {
        path: "employees",
        loadChildren: () =>
          import("./employees/employees.module").then((m) => m.EmployeesModule),
      },
      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientsModule),
      },
      {
        path: "projects",
        loadChildren: () =>
          import("./projects/projects.module").then((m) => m.ProjectsModule),
      },
      {
        path: "leads",
        loadChildren: () =>
          import("./leads/leads.module").then((m) => m.LeadsModule),
      },
      {
        path: "tickets",
        loadChildren: () =>
          import("./tickets/tickets.module").then((m) => m.TicketsModule),
        // canActivate: [AuthGuardAdmin],
      },
      {
        path: "support",
        loadChildren: () =>
          import("./supportTickets/tickets.module").then(
            (m) => m.SupportTicketsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "accounts",
        loadChildren: () =>
          import("./accounts/accounts.module").then((m) => m.AccountsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "payroll",
        loadChildren: () =>
          import("./payroll/payroll.module").then((m) => m.PayrollModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "policies",
        loadChildren: () =>
          import("./policies/policies.module").then((m) => m.PoliciesModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./reports/reports.module").then((m) => m.ReportsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "performance",
        loadChildren: () =>
          import("./performance/performance.module").then(
            (m) => m.PerformanceModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "goals",
        loadChildren: () =>
          import("./goals/goals.module").then((m) => m.GoalsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "training",
        loadChildren: () =>
          import("./training/training.module").then((m) => m.TrainingModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "promotion",
        loadChildren: () =>
          import("./promotion/promotion.module").then((m) => m.PromotionModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "resignation",
        loadChildren: () =>
          import("./resignation/resignation.module").then(
            (m) => m.ResignationModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "termination",
        loadChildren: () =>
          import("./termination/termination.module").then(
            (m) => m.TerminationModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "assets",
        loadChildren: () =>
          import("./assets/assets.module").then((m) => m.AssetsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "jobs",
        loadChildren: () =>
          import("./jobs/jobs.module").then((m) => m.JobsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "knowledgebase",
        loadChildren: () =>
          import("./knowledgebase/knowledgebase.module").then(
            (m) => m.KnowledgebaseModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "activities",
        loadChildren: () =>
          import("./activities/activities.module").then(
            (m) => m.ActivitiesModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then((m) => m.SettingsModule),
        // canActivate: [AuthGuardAdmin],
      },
      {
        path: "pages",
        loadChildren: () =>
          import("./pages/pages.module").then((m) => m.PagesModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "components",
        loadChildren: () =>
          import("./components/components.module").then(
            (m) => m.ComponentsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "scheduling",
        loadChildren: () =>
          import("./scheduling/scheduling.module").then(
            (m) => m.SchedulingModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "shift",
        loadChildren: () =>
          import("./shift/shift.module").then((m) => m.ShiftModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "category",
        loadChildren: () =>
          import("./category/category.module").then((m) => m.CategoryModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "budget",
        loadChildren: () =>
          import("./budget/budget.module").then((m) => m.BudgetModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "budgetexpenses",
        loadChildren: () =>
          import("./budgetexpenses/budgetexpenses.module").then(
            (m) => m.BudgetexpensesModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "budgetrevenues",
        loadChildren: () =>
          import("./budgetrevenues/budgetrevenues.module").then(
            (m) => m.BudgetrevenuesModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "paymentreports",
        loadChildren: () =>
          import("./paymentreports/paymentreports.module").then(
            (m) => m.PaymentreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "projectreports",
        loadChildren: () =>
          import("./projectreports/projectreports.module").then(
            (m) => m.ProjectreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "taskreports",
        loadChildren: () =>
          import("./taskreports/taskreports.module").then(
            (m) => m.TaskreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "userreports",
        loadChildren: () =>
          import("./userreports/userreports.module").then(
            (m) => m.UserreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "employeereports",
        loadChildren: () =>
          import("./employeereports/employeereports.module").then(
            (m) => m.EmployeereportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "payslipreports",
        loadChildren: () =>
          import("./payslipreports/payslipreports.module").then(
            (m) => m.PayslipreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "attendancereports",
        loadChildren: () =>
          import("./attendancereports/attendancereports.module").then(
            (m) => m.AttendancereportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "leavereports",
        loadChildren: () =>
          import("./leavereports/leavereports.module").then(
            (m) => m.LeavereportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "dailyreports",
        loadChildren: () =>
          import("./dailyreports/dailyreports.module").then(
            (m) => m.DailyreportsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "userdashboard",
        loadChildren: () =>
          import("./userdashboard/userdashboard.module").then(
            (m) => m.UserdashboardModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "jobsdashboard",
        loadChildren: () =>
          import("./jobsdashboard/jobsdashboard.module").then(
            (m) => m.JobsdashboardModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "manageresume",
        loadChildren: () =>
          import("./manageresume/manageresume.module").then(
            (m) => m.ManageresumeModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "candidate",
        loadChildren: () =>
          import("./candidate/candidate.module").then((m) => m.CandidateModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "interview",
        loadChildren: () =>
          import("./interview/interview.module").then((m) => m.InterviewModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "offer",
        loadChildren: () =>
          import("./offer/offer.module").then((m) => m.OfferModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "experience",
        loadChildren: () =>
          import("./experience/experience.module").then(
            (m) => m.ExperienceModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "studentcandidate",
        loadChildren: () =>
          import("./studentcandidate/studentcandidate.module").then(
            (m) => m.StudentcandidateModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "scheduletiming",
        loadChildren: () =>
          import("./scheduletiming/scheduletiming.module").then(
            (m) => m.ScheduletimingModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "aptitute",
        loadChildren: () =>
          import("./aptitute/aptitute.module").then((m) => m.AptituteModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "useralljobs",
        loadChildren: () =>
          import("./useralljobs/useralljobs.module").then(
            (m) => m.UseralljobsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "savedjobs",
        loadChildren: () =>
          import("./savedjobs/savedjobs.module").then((m) => m.SavedjobsModule),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "appliedjobs",
        loadChildren: () =>
          import("./appliedjobs/appliedjobs.module").then(
            (m) => m.AppliedjobsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "interviewing",
        loadChildren: () =>
          import("./interviewing/interviewing.module").then(
            (m) => m.InterviewingModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "offeredjobs",
        loadChildren: () =>
          import("./offeredjobs/offeredjobs.module").then(
            (m) => m.OfferedjobsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "visitedjobs",
        loadChildren: () =>
          import("./visitedjobs/visitedjobs.module").then(
            (m) => m.VisitedjobsModule
          ),
        canActivate: [AuthGuardAdmin],
      },
      {
        path: "archivedjobs",
        loadChildren: () =>
          import("./archivedjobs/archivedjobs.module").then(
            (m) => m.ArchivedjobsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModulesRoutingModule {}
