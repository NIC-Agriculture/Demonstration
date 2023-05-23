import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationClusterImplementationRoutingModule } from './demonstration-cluster-implementation-routing.module';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DemonstrationClusterImplementationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class DemonstrationClusterImplementationModule { }
