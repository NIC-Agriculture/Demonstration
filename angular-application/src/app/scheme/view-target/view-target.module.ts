import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTargetRoutingModule } from './view-target-routing.module';
import { ViewTargetComponent } from './view-target/view-target.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    NgxPrintModule,
  ]
})
export class ViewTargetModule { }
