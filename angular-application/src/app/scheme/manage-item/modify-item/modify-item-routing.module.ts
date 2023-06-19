import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyItemComponent } from './modify-item/modify-item.component';

const routes: Routes = [
  {
    path: '',
    component: ModifyItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyItemRoutingModule { }
