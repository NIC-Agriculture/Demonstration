import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveIncentiveSeedCostRoutingModule } from './approve-incentive-seed-cost-routing.module';
import { ApproveIncentiveSeedCostComponent } from './approve-incentive-seed-cost/approve-incentive-seed-cost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgxPrintModule } from 'ngx-print';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ApproveIncentiveSeedCostComponent
  ],
  imports: [
    CommonModule,
    ApproveIncentiveSeedCostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    NgxPrintModule
  ]
})
export class ApproveIncentiveSeedCostModule { }
