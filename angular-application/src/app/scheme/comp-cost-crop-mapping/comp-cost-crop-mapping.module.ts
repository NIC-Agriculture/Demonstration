import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompCostCropMappingRoutingModule } from './comp-cost-crop-mapping-routing.module';
import { CompCostCropMappingComponent } from './comp-cost-crop-mapping/comp-cost-crop-mapping.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatRadioModule } from '@angular/material/radio';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    CompCostCropMappingComponent
  ],
  imports: [
    CommonModule,
    CompCostCropMappingRoutingModule,
    NgxSkeletonLoaderModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatIconModule
    
  ]
})
export class CompCostCropMappingModule { }
