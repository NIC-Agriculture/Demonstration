import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubSchemeComponent } from './add-sub-scheme/add-sub-scheme.component';

const routes: Routes = [
  {
    path: '',
    component: AddSubSchemeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubSchemeRoutingModule { }
