import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationReportRoutingModule } from './demonstration-report-routing.module';
import { DemonstrationReportComponent } from './demonstration-report/demonstration-report.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DemonstrationReportComponent
  ],
  imports: [
    CommonModule,
    DemonstrationReportRoutingModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemonstrationReportModule { }
