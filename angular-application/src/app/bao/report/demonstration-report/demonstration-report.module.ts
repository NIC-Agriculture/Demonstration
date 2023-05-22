import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationReportRoutingModule } from './demonstration-report-routing.module';
import { DemonstrationReportComponent } from './demonstration-report/demonstration-report.component';
import {NgxPrintModule} from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DemonstrationClusterImplementationComponent } from '../demonstration-cluster-implementation/demonstration-cluster-implementation/demonstration-cluster-implementation.component';


@NgModule({
  declarations: [
    DemonstrationReportComponent,
    DemonstrationClusterImplementationComponent,
  ],
  imports: [
    CommonModule,
    DemonstrationReportRoutingModule,
    NgxPrintModule,
    FormsModule,
    MatTabsModule,
  ]
})
export class DemonstrationReportModule { }
