import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockTargetMonitoringRoutingModule } from './block-target-monitoring-routing.module';
import { BlockTargetMonitoringComponent } from './block-target-monitoring/block-target-monitoring.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    BlockTargetMonitoringComponent
  ],
  imports: [
    CommonModule,
    BlockTargetMonitoringRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class BlockTargetMonitoringModule { }
