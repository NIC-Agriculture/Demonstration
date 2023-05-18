import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyFarmerIDRoutingModule } from './modify-farmer-id-routing.module';
import { ModifyFarmeridComponent } from './modify-farmerid/modify-farmerid.component';


@NgModule({
  declarations: [
    ModifyFarmeridComponent
  ],
  imports: [
    CommonModule,
    ModifyFarmerIDRoutingModule
  ]
})
export class ModifyFarmerIDModule { }
