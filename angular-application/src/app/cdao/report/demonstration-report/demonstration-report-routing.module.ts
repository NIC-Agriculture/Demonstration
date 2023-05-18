import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonstrationReportComponent } from './demonstration-report/demonstration-report.component';

const routes: Routes = [
  {
    path: '',
    component:DemonstrationReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonstrationReportRoutingModule { }
