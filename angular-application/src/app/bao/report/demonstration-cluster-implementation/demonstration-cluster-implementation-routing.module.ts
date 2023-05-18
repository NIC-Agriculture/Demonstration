import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonstrationClusterImplementationComponent } from './demonstration-cluster-implementation/demonstration-cluster-implementation.component';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationClusterImplementationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonstrationClusterImplementationRoutingModule { }
