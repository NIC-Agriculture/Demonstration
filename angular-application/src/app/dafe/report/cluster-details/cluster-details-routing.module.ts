import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterDetailsComponent } from './cluster-details/cluster-details.component';

const routes: Routes = [
  {
    path: '',
    component: ClusterDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterDetailsRoutingModule { }
