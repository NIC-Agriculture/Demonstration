import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DistrictWiseSeedReportComponent } from './district-wise-seed-report/district-wise-seed-report.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    DistrictWiseSeedReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatTableModule,
    FormsModule,
    NgxPrintModule
  ]
})
export class ReportModule { }
