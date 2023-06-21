import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyItemRoutingModule } from './modify-item-routing.module';
import { ModifyItemComponent } from './modify-item/modify-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ModifyItemComponent
  ],
  imports: [
    CommonModule,
    ModifyItemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ModifyItemModule { }
