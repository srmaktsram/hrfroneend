import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';
 import { AffilateRegComponent } from './affilateReg/affilatereg.component';
import { AffilateComponent } from './affilate.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

export const routes = [
  { path: '', component:AffilateComponent , pathMatch: 'full' },
  { path: 'affilatereg', component: AffilateRegComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  
  ],
  declarations: [
    AffilateRegComponent,FooterComponent,HeaderComponent
  ]
})
export class AffilateModule { }
