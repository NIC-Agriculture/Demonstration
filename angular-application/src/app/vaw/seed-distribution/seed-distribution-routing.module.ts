import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeedDistributionComponent } from 'src/app/vaw/seed-distribution/seed-distribution/seed-distribution.component';

const routes: Routes = [
  {
    path: '',
    component: SeedDistributionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeedDistributionRoutingModule { }
