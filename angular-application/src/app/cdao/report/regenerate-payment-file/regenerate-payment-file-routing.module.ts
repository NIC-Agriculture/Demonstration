import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegeneratePaymentFileComponent } from './regenerate-payment-file/regenerate-payment-file.component';

const routes: Routes = [
  {
    path: '',
    component: RegeneratePaymentFileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegeneratePaymentFileRoutingModule { }
