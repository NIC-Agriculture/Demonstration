import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePaymentFileComponent } from './generate-payment-file/generate-payment-file.component';

const routes: Routes = [
  {
    path: '',
    component: GeneratePaymentFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratePaymentFileRoutingModule { }
