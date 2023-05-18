import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonstrationPatchListComponent } from 'src/app/vaw/demonstration-patch-list/demonstration-patch-list/demonstration-patch-list.component';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationPatchListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonstrationPatchListRoutingModule { }
