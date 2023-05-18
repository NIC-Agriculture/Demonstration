import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveDealerSaleRoutingModule } from './approve-dealer-sale-routing.module';
import { ApproveDealerSaleComponent } from './approve-dealer-sale/approve-dealer-sale.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ViewReceiptComponent } from './approve-dealer-sale/view-receipt/view-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ApproveDealerSaleComponent,
    ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApproveDealerSaleRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatIconModule,
    NgxPrintModule
  ]
})
export class ApproveDealerSaleModule { }
