import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SeedDetailsComponent } from './seed-details/seed-details.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    SeedDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatTableModule,
    FormsModule,
    NgxPrintModule,
  ]
})
export class ReportModule { }
