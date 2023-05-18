import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictTargetComponent } from './district-target/district-target.component';

const routes: Routes = [
  {
    path: '',
    component: DistrictTargetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictTargetRoutingModule { }
