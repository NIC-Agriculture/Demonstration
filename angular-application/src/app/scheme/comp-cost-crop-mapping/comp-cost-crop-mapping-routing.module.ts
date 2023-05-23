import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompCostCropMappingComponent } from './comp-cost-crop-mapping/comp-cost-crop-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: CompCostCropMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompCostCropMappingRoutingModule { }
