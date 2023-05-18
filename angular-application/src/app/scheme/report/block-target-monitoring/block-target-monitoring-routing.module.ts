import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockTargetMonitoringComponent } from './block-target-monitoring/block-target-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: BlockTargetMonitoringComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockTargetMonitoringRoutingModule { }
