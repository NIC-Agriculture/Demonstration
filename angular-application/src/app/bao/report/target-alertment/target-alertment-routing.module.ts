import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetAlertmentComponent } from './target-alertment/target-alertment.component';

const routes: Routes = [
  {
    path: '',
    component: TargetAlertmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetAlertmentRoutingModule { }
