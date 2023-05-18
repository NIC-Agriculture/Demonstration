import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTargetComponent } from './view-target/view-target.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTargetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTargetRoutingModule { }
