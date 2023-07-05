import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplianceReportRoutingModule } from './compliance-report-routing.module';
import { ComplianceReportComponent } from './compliance-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    ComplianceReportComponent
  ],
  imports: [
    CommonModule,
    ComplianceReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class ComplianceReportModule { }
