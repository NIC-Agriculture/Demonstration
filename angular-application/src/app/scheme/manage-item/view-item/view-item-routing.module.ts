import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewItemComponent } from './view-item/view-item.component';

const routes: Routes = [
  {
    path: '',
    component: ViewItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewItemRoutingModule { }
