import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterDetailsRoutingModule } from './cluster-details-routing.module';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    ClusterDetailsComponent
  ],
  imports: [
    CommonModule,
    ClusterDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ]
})
export class ClusterDetailsModule { }
