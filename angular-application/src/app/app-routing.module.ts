import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardGuard } from './auth/guard/auth-guard.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./registration-form/registration-form.module').then(module => module.RegistrationFormModule)
  // },
  {
    path: 'scheme',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'SCHEME' ,preload: true },
    component: LayoutComponent,
    loadChildren: () => import('./scheme/scheme.module').then(module => module.SchemeModule)
  },
  {
    path: 'cdao',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'CDAO', preload: true},
    component: LayoutComponent,
    loadChildren: () => import('./cdao/cdao.module').then(module => module.CdaoModule)
  },
  {
    path: 'bao',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'BAO' , preload: true },
    component: LayoutComponent,
    loadChildren: () => import('./bao/bao.module').then(module => module.BaoModule)
  },
  {
    path: 'ado',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'ADO' , preload: true},
    component: LayoutComponent,
    loadChildren: () => import('./ado/ado.module').then(module => module.AdoModule)
  },
  {
    path: 'vaw',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'VAW' , preload: true},
    component: LayoutComponent,
    loadChildren: () => import('./vaw/vaw.module').then(module => module.VawModule)
  },
  {
    path: 'dealer',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'DEALER' , preload: true},
    component: LayoutComponent,
    loadChildren: () => import('./dealer/dealer.module').then(module => module.DealerModule)
  },
  {
    path: 'ossc',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'OSSC' , preload: true},
    component: LayoutComponent,
    loadChildren: () => import('./ossc/ossc.module').then(module => module.OsscModule)
  },
  {
    path: 'dafe',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'DAFE' ,preload: true },
    component: LayoutComponent,
    loadChildren: () => import('./dafe/dafe.module').then(module => module.DafeModule)
  },
  {
    path: 'admin',
    canLoad: [ AuthGuardGuard ],
    canActivateChild: [ AuthGuardGuard ],
    data: {role: 'ADMIN' ,preload: true },
    component: LayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(module => module.ADMINModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







