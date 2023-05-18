import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteDemonstrationPatchComponent } from './delete-demonstration-patch/delete-demonstration-patch.component';

const routes: Routes = [
  {
    path:'',
    component:DeleteDemonstrationPatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteDemonstrationPatchRoutingModule { }
