import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCropvarietyComponent } from './add-cropvariety/add-cropvariety.component';

const routes: Routes = [
  {
    path:'',
    component: AddCropvarietyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCropvarietyRoutingModule { }
