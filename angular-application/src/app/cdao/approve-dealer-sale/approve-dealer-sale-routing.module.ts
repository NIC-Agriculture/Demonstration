import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveDealerSaleComponent } from './approve-dealer-sale/approve-dealer-sale.component';

const routes: Routes = [
  {
    path: '',
    component:ApproveDealerSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveDealerSaleRoutingModule { }
