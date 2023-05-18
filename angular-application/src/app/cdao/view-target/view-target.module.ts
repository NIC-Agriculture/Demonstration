import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTargetRoutingModule } from './view-target-routing.module';
import { ViewTargetComponent } from './view-target/view-target.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    ViewTargetComponent
  ],
  imports: [
    CommonModule,
    ViewTargetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatRadioModule,
    NgxPrintModule
  ]
})
export class ViewTargetModule { }
