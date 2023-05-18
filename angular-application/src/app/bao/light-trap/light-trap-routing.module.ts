import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightTrapComponent } from './light-trap/light-trap.component';

const routes: Routes = [
  {
    path: '',
    component : LightTrapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightTrapRoutingModule { }
