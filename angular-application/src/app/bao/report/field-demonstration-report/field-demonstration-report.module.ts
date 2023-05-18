import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldDemonstrationReportRoutingModule } from './field-demonstration-report-routing.module';
import { FieldDemonstrationReportComponent } from './field-demonstration-report.component';


@NgModule({
  declarations: [
    FieldDemonstrationReportComponent
  ],
  imports: [
    CommonModule,
    FieldDemonstrationReportRoutingModule
  ]
})
export class FieldDemonstrationReportModule { }
