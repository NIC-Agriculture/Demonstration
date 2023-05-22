import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationClusterImplementationRoutingModule } from './demonstration-cluster-implementation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


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
