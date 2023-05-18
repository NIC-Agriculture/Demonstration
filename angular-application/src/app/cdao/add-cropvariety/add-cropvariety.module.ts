import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCropvarietyRoutingModule } from './add-cropvariety-routing.module';
import { AddCropvarietyComponent } from './add-cropvariety/add-cropvariety.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [
    AddCropvarietyComponent
  ],
  imports: [
    CommonModule,
    AddCropvarietyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectFilterModule
  ]
})
export class AddCropvarietyModule { }
