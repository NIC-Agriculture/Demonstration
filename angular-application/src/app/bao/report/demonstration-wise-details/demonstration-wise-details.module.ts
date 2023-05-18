import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationWiseDetailsRoutingModule } from './demonstration-wise-details-routing.module';
import { DemonstrationWiseDetailsComponent } from './demonstration-wise-details/demonstration-wise-details.component';
import { FormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    DemonstrationWiseDetailsComponent
  ],
  imports: [
    CommonModule,
    DemonstrationWiseDetailsRoutingModule,
    FormsModule,
    NgxPrintModule
  ]
})
export class DemonstrationWiseDetailsModule { }
