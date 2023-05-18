import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictWiseSeedReportComponent } from './district-wise-seed-report/district-wise-seed-report.component';

const routes: Routes = [
  {
    path: '',
    component : DistrictWiseSeedReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
