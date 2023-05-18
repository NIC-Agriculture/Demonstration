import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'block-target-monitoring',
    loadChildren: () => import('./block-target-monitoring/block-target-monitoring.module').then(module => module.BlockTargetMonitoringModule)
  },
  {
    path: 'cluster-details',
    loadChildren: () => import('./cluster-details/cluster-details.module').then(module => module.ClusterDetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
