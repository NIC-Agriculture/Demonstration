import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeedRequiredRoutingModule } from './seed-required-routing.module';
import { SeedRequiredComponent } from './seed-required/seed-required.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    SeedRequiredComponent
  ],
  imports: [
    CommonModule,
    SeedRequiredRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ]
})
export class SeedRequiredModule { }
