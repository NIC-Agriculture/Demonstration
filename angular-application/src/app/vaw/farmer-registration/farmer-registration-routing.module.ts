import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamerRegistrationComponent } from 'src/app/vaw/farmer-registration/famer-registration/famer-registration.component'


const routes: Routes = [
  {
    path: '',
    component: FamerRegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRegistrationRoutingModule { }
