import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldDemonstrationReportRoutingModule } from './field-demonstration-report-routing.module';
import { FieldDemonstrationReportComponent } from './field-demonstration-report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FieldDemonstrationReportComponent
  ],
  imports: [
    CommonModule,
    FieldDemonstrationReportRoutingModule,
    FormsModule
  ]
})
export class FieldDemonstrationReportModule { }
