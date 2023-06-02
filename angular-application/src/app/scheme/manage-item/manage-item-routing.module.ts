import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add-item',
    loadChildren: () => import('./add-item/add-item.module').then(module => module.AddItemModule)
  },
  {
    path: 'view-item',
    loadChildren: () => import('./view-item/view-item.module').then(module => module.ViewItemModule)
  },
  {
    path: 'modify-item',
    loadChildren: () => import('./modify-item/modify-item.module').then(module => module.ModifyItemModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemRoutingModule { }
