import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplianceReportComponent } from './compliance-report.component';

const routes: Routes = [
  {
    path: '',
    component: ComplianceReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceReportRoutingModule { }
