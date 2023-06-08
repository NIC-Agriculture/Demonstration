import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeedDistributionRoutingModule } from './seed-distribution-routing.module';
import { SeedDistributionComponent } from './seed-distribution/seed-distribution.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    SeedDistributionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SeedDistributionRoutingModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxPrintModule
  ]
})
export class SeedDistributionModule { }
