import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSuccessFailureEntryComponent } from './payment-success-failure-entry/payment-success-failure-entry.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentSuccessFailureEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSuccessFailureEntryRoutingModule { }
