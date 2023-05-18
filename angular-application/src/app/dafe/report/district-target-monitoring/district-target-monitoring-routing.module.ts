import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictTargetMonitoringComponent } from './district-target-monitoring/district-target-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: DistrictTargetMonitoringComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictTargetMonitoringRoutingModule { }
