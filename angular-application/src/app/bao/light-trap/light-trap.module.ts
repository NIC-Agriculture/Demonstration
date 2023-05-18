import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightTrapRoutingModule } from './light-trap-routing.module';
import { ConfirmPageComponent } from './light-trap/confirm-page/confirm-page.component';
import { LightTrapComponent } from './light-trap/light-trap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    LightTrapComponent,
    ConfirmPageComponent
  ],
  imports: [
    CommonModule,
    LightTrapRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ]
})
export class LightTrapModule { }
