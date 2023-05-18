import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceGeneratedListComponent } from './invoice-generated-list/invoice-generated-list.component';

const routes: Routes = [{
  path : '',
  component : InvoiceGeneratedListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceGeneratedListRoutingModule { }
