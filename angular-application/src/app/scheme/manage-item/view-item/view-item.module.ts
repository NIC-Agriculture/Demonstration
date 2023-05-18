import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewItemRoutingModule } from './view-item-routing.module';
import { ViewItemComponent } from './view-item/view-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    ViewItemComponent
  ],
  imports: [
    CommonModule,
    ViewItemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
  ]
})
export class ViewItemModule { }
