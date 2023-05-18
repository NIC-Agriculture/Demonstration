import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockTargetComponent } from './block-target/block-target.component';

const routes: Routes = [
  {
    path: '',
    component: BlockTargetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockTargetRoutingModule { }
