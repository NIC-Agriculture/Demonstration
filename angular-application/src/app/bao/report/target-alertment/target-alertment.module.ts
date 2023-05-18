import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetAlertmentRoutingModule } from './target-alertment-routing.module';
import { TargetAlertmentComponent } from './target-alertment/target-alertment.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TargetAlertmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TargetAlertmentRoutingModule,
    NgxPrintModule,
  ]
})
export class TargetAlertmentModule { }
