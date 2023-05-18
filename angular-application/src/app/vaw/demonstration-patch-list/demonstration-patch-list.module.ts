import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationPatchListRoutingModule } from './demonstration-patch-list-routing.module';
import { DemonstrationPatchListComponent } from './demonstration-patch-list/demonstration-patch-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    DemonstrationPatchListComponent
  ],
  imports: [
    CommonModule,
    DemonstrationPatchListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ]
})
export class DemonstrationPatchListModule { }
