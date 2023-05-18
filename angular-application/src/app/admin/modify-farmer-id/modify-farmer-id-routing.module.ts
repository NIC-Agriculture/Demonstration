import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyFarmeridComponent } from './modify-farmerid/modify-farmerid.component';

const routes: Routes = [
  {
    path : '',
    component : ModifyFarmeridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyFarmerIDRoutingModule { }
