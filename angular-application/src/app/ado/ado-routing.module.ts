import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoleObject = { role: 'ADO' };
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    data: RoleObject,
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
  },
  {
    path: 'verify-dealer-sale',
    data: RoleObject,
    loadChildren: () => import('./verify-dealer-sale/verify-dealer-sale.module').then(module => module.VerifyDealerSaleModule)
  },
  {
    path: 'report',
    data: RoleObject,
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoRoutingModule { }
