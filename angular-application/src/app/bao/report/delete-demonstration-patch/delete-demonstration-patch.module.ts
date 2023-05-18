import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteDemonstrationPatchRoutingModule } from './delete-demonstration-patch-routing.module';
import { DeleteDemonstrationPatchComponent, DialogOverviewExampleDialog } from './delete-demonstration-patch/delete-demonstration-patch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    DeleteDemonstrationPatchComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    DeleteDemonstrationPatchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class DeleteDemonstrationPatchModule { }
