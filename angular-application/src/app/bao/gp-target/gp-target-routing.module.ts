import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpTargetComponent } from 'src/app/bao/gp-target/gp-target/gp-target.component';
import { ManageDemonstrationComponent } from './manage-demonstration/manage-demonstration.component';

const routes: Routes = [
  {
    path: '',
    component: GpTargetComponent
  },
  {
    path: 'manage-demonstration',
    component: ManageDemonstrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpTargetRoutingModule { }
