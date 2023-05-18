import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockTargetRoutingModule } from './block-target-routing.module';
import { BlockTargetComponent } from './block-target/block-target.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [
    BlockTargetComponent
  ],
  imports: [
    CommonModule,
    BlockTargetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatRadioModule,
    MatSelectModule, 
    MatFormFieldModule,
    MatSelectFilterModule
  ]
})
export class BlockTargetModule { }
