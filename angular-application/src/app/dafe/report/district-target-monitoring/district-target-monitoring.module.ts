import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictTargetMonitoringRoutingModule } from './district-target-monitoring-routing.module';
import { DistrictTargetMonitoringComponent } from './district-target-monitoring/district-target-monitoring.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    DistrictTargetMonitoringComponent
  ],
  imports: [
    CommonModule,
    DistrictTargetMonitoringRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class DistrictTargetMonitoringModule { }
