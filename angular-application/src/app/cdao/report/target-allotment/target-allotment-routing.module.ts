import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetAllotmentComponent } from './target-allotment/target-allotment.component';

const routes: Routes = [
  {
    path: '',
    component:TargetAllotmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetAllotmentRoutingModule { }
