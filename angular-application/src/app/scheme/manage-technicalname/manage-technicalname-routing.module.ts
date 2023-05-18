import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-technicalname',
    loadChildren: () => import('./add-technicalname/add-technicalname.module').then(module => module.AddTechnicalnameModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTechnicalnameRoutingModule { }
