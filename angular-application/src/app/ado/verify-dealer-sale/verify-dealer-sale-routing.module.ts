import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyDealerSaleComponent } from './verify-dealer-sale/verify-dealer-sale.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyDealerSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyDealerSaleRoutingModule { }
