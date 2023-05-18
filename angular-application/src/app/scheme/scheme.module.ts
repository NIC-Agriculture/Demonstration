import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemeRoutingModule } from './scheme-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchemeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SchemeModule { }
