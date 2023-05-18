import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetAllotmentRoutingModule } from './target-allotment-routing.module';
import { TargetAllotmentComponent } from './target-allotment/target-allotment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    TargetAllotmentComponent
  ],
  imports: [
    CommonModule,
    TargetAllotmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class TargetAllotmentModule { }
