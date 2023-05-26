import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterDetailsRoutingModule } from './cluster-details-routing.module';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { DemonstrationReportComponent } from '../demonstration-report/demonstration-report/demonstration-report.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ClusterDetailsComponent,
    DemonstrationReportComponent
  ],
  imports: [
    CommonModule,
    ClusterDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    MatTabsModule,
    Ng2SearchPipeModule
  ]
})
export class ClusterDetailsModule { }
