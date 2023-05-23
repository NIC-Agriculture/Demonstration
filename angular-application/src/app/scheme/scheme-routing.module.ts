import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthGuardGuard } from '../auth/guard/auth-guard.guard';


const RoleObject = { role: 'SCHEME' };

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
    path: 'district-target',
    data: RoleObject,
    loadChildren: () => import('./district-target/district-target.module').then(module => module.DistrictTargetModule)
  },
  {
    path: 'add-Subscheme',
    data: RoleObject,
    loadChildren: () => import('./add-sub-scheme/add-sub-scheme.module').then(module => module.AddSubSchemeModule)
  },
  {
    path: 'add-Component',
    data: RoleObject,
    loadChildren: () => import('./add-component/add-component.module').then(module => module.AddComponentModule)
  },
  {
    path: 'component-mapping',
    data: RoleObject,
    loadChildren: () => import('./comp-cost-crop-mapping/comp-cost-crop-mapping.module').then(module => module.CompCostCropMappingModule)
  },
  {
    path: 'manage-item',
    data: RoleObject,
    loadChildren: () => import('./manage-item/manage-item.module').then(module => module.ManageItemModule)
  },
  {
    path: 'manage-technicalname',
    data: RoleObject,
    loadChildren: () => import('./manage-technicalname/manage-technicalname.module').then(module => module.ManageTechnicalnameModule)
  },
  {
    path: 'view-target',
    data: RoleObject,
    loadChildren: () => import('./view-target/view-target.module').then(module => module.ViewTargetModule)
  },
  {
    path: 'report',
    data: RoleObject,
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
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
export class SchemeRoutingModule { }
