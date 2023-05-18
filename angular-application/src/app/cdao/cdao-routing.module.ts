import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthGuardGuard } from '../auth/guard/auth-guard.guard';

const RoleObject = { role: 'CDAO' };

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
    path: 'block-target',
    data: RoleObject,
    loadChildren: () => import('./block-target/block-target.module').then(module => module.BlockTargetModule)
  },
  {
    path: 'approve-dealer-sale',
    data: RoleObject,
    loadChildren: () => import('./approve-dealer-sale/approve-dealer-sale.module').then(module => module.ApproveDealerSaleModule)
  },
  {
    path: 'approve-IncentiveORseedCost-sale',
    data: RoleObject,
    loadChildren: () => import('./approve-incentive-seed-cost/approve-incentive-seed-cost.module').then(module => module.ApproveIncentiveSeedCostModule)
  },
  {
    path: 'report',
    data: RoleObject,
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
  },
  {
    path: 'generate-payment-file',
    data: RoleObject,
    loadChildren: () => import('./generate-payment-file/generate-payment-file.module').then(module => module.GeneratePaymentFileModule)
  },
  {
    path: 'payment-success-failure-entry',
    data: RoleObject,
    loadChildren: () => import('./payment-success-failure-entry/payment-success-failure-entry.module').then(module => module.PaymentSuccessFailureEntryModule)
  },
  {
    path: 'view-target',
    data: RoleObject,
    loadChildren: () => import('./view-target/view-target.module').then(module => module.ViewTargetModule)
  },
  {
    path: 'changePassword',
    canActivate: [AuthGuardGuard],
    data: RoleObject,
    component: ChangePasswordComponent
  },
  {
    path: 'add-cropvariety',
    data: RoleObject,
    loadChildren: () => import('./add-cropvariety/add-cropvariety.module').then(module => module.AddCropvarietyModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdaoRoutingModule { }
