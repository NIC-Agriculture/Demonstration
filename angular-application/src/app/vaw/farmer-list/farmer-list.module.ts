import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogOverviewExampleDialog, FarmerListComponent } from './farmer-list/farmer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmerListRoutingModule } from './farmer-list-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    FarmerListComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    FarmerListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    Ng2SearchPipeModule
  ]
})
export class FarmerListModule { }
