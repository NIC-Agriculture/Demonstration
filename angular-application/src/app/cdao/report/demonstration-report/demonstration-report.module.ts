import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationReportRoutingModule } from './demonstration-report-routing.module';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DemonstrationReportRoutingModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class DemonstrationReportModule { }
