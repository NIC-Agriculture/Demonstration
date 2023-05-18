import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaoRoutingModule } from './bao-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaoRoutingModule,
    MatDialogModule,
    MatButtonModule

  ]
})
export class BaoModule { }


