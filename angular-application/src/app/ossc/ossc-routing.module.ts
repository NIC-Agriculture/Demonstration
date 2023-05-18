import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { AuthGuardGuard } from '../auth/guard/auth-guard.guard';

const RoleObject = { role: 'OSSC' };
const routes: Routes = [
  {
    path: '',
    redirectTo: 'Report',
    pathMatch: 'full'
  },
  {
    path: 'Report',
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
export class OsscRoutingModule { }
