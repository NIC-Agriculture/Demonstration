import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTechnicalnameComponent } from './add-technicalname/add-technicalname.component';

const routes: Routes = [
  {
    path: '',
    component: AddTechnicalnameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTechnicalnameRoutingModule { }
