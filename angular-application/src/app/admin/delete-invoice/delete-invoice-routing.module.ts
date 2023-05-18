import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice.component';

const routes: Routes = [
  {
    path : '',
    component : DeleteInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteInvoiceRoutingModule { }
