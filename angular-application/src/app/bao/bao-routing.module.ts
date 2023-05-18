import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthGuardGuard } from '../auth/guard/auth-guard.guard';

const RoleObject = { role: 'BAO' };
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
    path: 'gp-target',
    data: RoleObject,
    loadChildren: () => import('./gp-target/gp-target.module').then(module => module.GpTargetModule)
  },
  {
    path: 'report',
    data: RoleObject,
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
  },
  {
    path: 'verify-dealer-sale',
    data: RoleObject,
    loadChildren: () => import('./verify-dealer-sale/verify-dealer-sale.module').then(module => module.VerifyDealerSaleModule)
  },
  {
    path: 'changePassword',
    canActivate: [AuthGuardGuard],
    data: RoleObject,
    component: ChangePasswordComponent
  },
  {
    path: 'distribute-light-trap',
    data: RoleObject,
    loadChildren: () => import('./light-trap/light-trap.module').then(module => module.LightTrapModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaoRoutingModule { }
