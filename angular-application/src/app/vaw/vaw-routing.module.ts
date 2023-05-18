import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthGuardGuard } from '../auth/guard/auth-guard.guard';

const RoleObject = { role: 'VAW' };
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
    path: 'farmer-registration',
    data: RoleObject,
    loadChildren: () => import('./farmer-registration/farmer-registration.module').then(module => module.FarmerRegistrationModule)
  },
  {
    path: 'farmer-list',
    data: RoleObject,
    loadChildren: () => import('./farmer-list/farmer-list.module').then(module => module.FarmerListModule)
  },
  {
    path: 'seed-distribution',
    data: RoleObject,
    loadChildren: () => import('./seed-distribution/seed-distribution.module').then(module => module.SeedDistributionModule)
  },
  {
    path: 'demonstration-patch-list',
    data: RoleObject,
    loadChildren: () => import('./demonstration-patch-list/demonstration-patch-list.module').then(module => module.DemonstrationPatchListModule)
  },
  {
    path: 'changePassword',
    canActivate: [AuthGuardGuard],
    data: RoleObject,
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VawRoutingModule { }
