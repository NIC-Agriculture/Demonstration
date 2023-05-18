import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeedRequiredComponent } from './seed-required/seed-required.component';

const routes: Routes = [
  {
    path:'',
    component: SeedRequiredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeedRequiredRoutingModule { }
