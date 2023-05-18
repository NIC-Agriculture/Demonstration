import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerListComponent } from 'src/app/vaw/farmer-list/farmer-list/farmer-list.component';


const routes: Routes = [
  {
    path: '',
    component: FarmerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerListRoutingModule { }
