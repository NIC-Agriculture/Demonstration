import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRegistrationRoutingModule } from './farmer-registration-routing.module';
import { FamerRegistrationComponent } from './famer-registration/famer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    FamerRegistrationComponent,
  ],
  imports: [
    CommonModule,
    FarmerRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class FarmerRegistrationModule { }
