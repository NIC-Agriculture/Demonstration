import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTechnicalnameRoutingModule } from './add-technicalname-routing.module';
import { AddTechnicalnameComponent } from './add-technicalname/add-technicalname.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddTechnicalnameComponent
  ],
  imports: [
    CommonModule,
    AddTechnicalnameRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddTechnicalnameModule { }
