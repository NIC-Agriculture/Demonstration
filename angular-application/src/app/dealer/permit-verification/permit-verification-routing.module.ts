import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermitVerificationComponent } from './permit-verification/permit-verification.component';

const routes: Routes = [
  {
    path: '',
    component: PermitVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermitVerificationRoutingModule { }
