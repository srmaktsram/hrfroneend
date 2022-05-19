import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './homepage-routing.module';
import { HomeComponent } from './home/home.component';
import { SharingModule } from '../sharing/sharing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatCardModule
    // MatCardModule,
  ]
})
export class HomePageModule { }
