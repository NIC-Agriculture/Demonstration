import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const RoleObject = { role: 'BAO' };
const routes: Routes = [
  {
    path: 'demonstration-wise-details',
    data: RoleObject,
    loadChildren: () => import('./demonstration-wise-details/demonstration-wise-details.module').then(module => module.DemonstrationWiseDetailsModule)
  },
  {
    path: 'demonstration-report',
    data: RoleObject,
    loadChildren: () => import('./demonstration-report/demonstration-report.module').then(module => module.DemonstrationReportModule)
  },
  {
    path: 'target-alertment',
    data: RoleObject,
    loadChildren: () => import('./target-alertment/target-alertment.module').then(module => module.TargetAlertmentModule)
  },
  {
    path: 'demonstration-cluster-implementation',
    data: RoleObject,
    loadChildren: () => import('./demonstration-cluster-implementation/demonstration-cluster-implementation.module').then(module => module.DemonstrationClusterImplementationModule)
  },
  {
    path: 'seed-required',
    data: RoleObject,
    loadChildren: () => import('./seed-required/seed-required.module').then(module => module.SeedRequiredModule)
  },
  {
    path: 'field-demonstration-report',
    data: RoleObject,
    loadChildren: () => import('./field-demonstration-report/field-demonstration-report.module').then(module => module.FieldDemonstrationReportModule)
  },
  {
    path: 'delete-demonstration-patch',
    data: RoleObject,
    loadChildren: () => import('./delete-demonstration-patch/delete-demonstration-patch.module').then(module => module.DeleteDemonstrationPatchModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
