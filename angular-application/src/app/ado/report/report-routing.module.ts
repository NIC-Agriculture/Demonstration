import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoleObject = { role: 'ADO' };
const routes: Routes = [
  {
    path: 'demonstration-report',
    data: RoleObject,
    loadChildren: () => import('./demonstration-report/demonstration-report.module').then(module => module.DemonstrationReportModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
