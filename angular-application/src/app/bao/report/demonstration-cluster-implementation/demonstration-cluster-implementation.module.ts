import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationClusterImplementationRoutingModule } from './demonstration-cluster-implementation-routing.module';
import { DemonstrationClusterImplementationComponent } from './demonstration-cluster-implementation/demonstration-cluster-implementation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    DemonstrationClusterImplementationComponent
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
