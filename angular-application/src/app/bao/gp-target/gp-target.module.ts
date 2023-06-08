import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpTargetRoutingModule } from './gp-target-routing.module';
import { GpTargetComponent } from './gp-target/gp-target.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { SelectPatchComponent } from './gp-target/select-patch/select-patch.component';
import { TargetAllocationComponent } from './gp-target/target-allocation/target-allocation.component';
import { GenerateDemonstrationComponent } from './gp-target/generate-demonstration/generate-demonstration.component';
import { ManageDemonstrationComponent } from './manage-demonstration/manage-demonstration.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    GpTargetComponent,
    SelectPatchComponent,
    TargetAllocationComponent,
    GenerateDemonstrationComponent,
    ManageDemonstrationComponent,
  ],
  imports: [
    CommonModule,
    GpTargetRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    NgxPrintModule
  ]
})

export class GpTargetModule { }


