import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonstrationWiseDetailsComponent } from 'src/app/bao/report/demonstration-wise-details/demonstration-wise-details/demonstration-wise-details.component';


const routes: Routes = [
  {
    path: '',
    component: DemonstrationWiseDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonstrationWiseDetailsRoutingModule { }
