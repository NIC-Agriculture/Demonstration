import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveIncentiveSeedCostComponent } from './approve-incentive-seed-cost/approve-incentive-seed-cost.component';

const routes: Routes = [
  {
    path : '',
    component : ApproveIncentiveSeedCostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveIncentiveSeedCostRoutingModule { }
