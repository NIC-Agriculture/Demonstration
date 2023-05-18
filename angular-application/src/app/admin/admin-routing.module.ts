import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const RoleObject = { role: 'ADMIN' };
const routes: Routes = [
  {
    path: '',
    redirectTo: 'delete-invoice',
    pathMatch: 'full'
  },
  {
    path: 'delete-invoice',
    data : RoleObject,
    loadChildren : () => import('./delete-invoice/delete-invoice.module').then(module => module.DeleteInvoiceModule)
  },
  {
    path: 'modify-farmer-details',
    data : RoleObject,
    loadChildren : () => import('./modify-farmer-id/modify-farmer-id.module').then(module => module.ModifyFarmerIDModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ADMINRoutingModule { }
