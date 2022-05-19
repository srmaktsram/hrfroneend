import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesMainComponent } from './activities-main/activities-main.component';
import { SharingModule } from 'src/app/sharing/sharing.module';




@NgModule({
  declarations: [ActivitiesComponent, ActivitiesMainComponent
  ],
  imports: [
    CommonModule,
    SharingModule,
    ActivitiesRoutingModule
  ]
})

export class ActivitiesModule { }
