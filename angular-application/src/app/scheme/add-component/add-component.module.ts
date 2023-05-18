import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddComponentRoutingModule } from './add-component-routing.module';
import { AddComponentComponent } from './add-component/add-component.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatRadioModule } from '@angular/material/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
 
@NgModule({
  declarations: [
    AddComponentComponent
  ],
  imports: [
    CommonModule,
    AddComponentRoutingModule,
    NgxSkeletonLoaderModule,
    MatRadioModule,
    // MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ]
})
export class AddComponentModule { }
