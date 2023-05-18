import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeedDetailsComponent } from './seed-details/seed-details.component';

const RoleObject = { role: 'CDAO' };
const routes: Routes = [
  {
    path: 'seedDetails',
    component:SeedDetailsComponent
  },
  {
    path: 'demonstration-report',
    data: RoleObject,
    loadChildren: () => import('./demonstration-report/demonstration-report.module').then(module => module.DemonstrationReportModule)
  },
  {
    path: 'target-allotment',
    data: RoleObject,
    loadChildren: () => import('./target-allotment/target-allotment.module').then(module => module.TargetAllotmentModule)
  },
  {
    path: 'cluster-details',
    data: RoleObject,
    loadChildren: () => import('./cluster-details/cluster-details.module').then(module => module.ClusterDetailsModule)
  },
  {
    path: 'regenerate-payment-file',
    data: RoleObject,
    loadChildren: () => import('./regenerate-payment-file/regenerate-payment-file.module').then(module => module.RegeneratePaymentFileModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
