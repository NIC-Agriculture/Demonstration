import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const RoleObject = { role: 'DEALER' };

const routes: Routes = [
  {
    path: '',
    redirectTo: 'permit-verification',
    pathMatch: 'full'
  },
  {
    path: 'permit-verification',
    data: RoleObject,
    loadChildren: () => import('./permit-verification/permit-verification.module').then(module => module.PermitVerificationModule)
  },
  {
    path: 'invoice-list',
    data: RoleObject,
    loadChildren: () => import('./invoice-generated-list/invoice-generated-list.module').then(module => module.InvoiceGeneratedListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
